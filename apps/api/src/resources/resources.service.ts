import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { asc, desc, eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../db/drizzle.module';
import { resourceCategories, resources } from '../db/schema';
import { UploadService } from '../upload/upload.service';
import {
  CreateCategoryDto,
  CreateResourceDto,
  UpdateCategoryDto,
  UpdateResourceDto,
} from './resources.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly upload: UploadService,
  ) {}

  // --- Categorías ---

  listCategories() {
    return this.db
      .select()
      .from(resourceCategories)
      .orderBy(asc(resourceCategories.order), asc(resourceCategories.id));
  }

  async findCategory(id: number) {
    const [row] = await this.db
      .select()
      .from(resourceCategories)
      .where(eq(resourceCategories.id, id));
    if (!row) throw new NotFoundException('Category not found');
    return row;
  }

  async createCategory(dto: CreateCategoryDto) {
    const [result] = await this.db.insert(resourceCategories).values(dto);
    return this.findCategory(result.insertId);
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    await this.findCategory(id);
    await this.db.update(resourceCategories).set(dto).where(eq(resourceCategories.id, id));
    return this.findCategory(id);
  }

  async removeCategory(id: number) {
    await this.findCategory(id);
    // Los recursos de esta categoría quedan sin categoría, no se borran.
    await this.db
      .update(resources)
      .set({ categoryId: null })
      .where(eq(resources.categoryId, id));
    await this.db.delete(resourceCategories).where(eq(resourceCategories.id, id));
    return { ok: true };
  }

  // --- Recursos ---

  listResources() {
    return this.db
      .select()
      .from(resources)
      .orderBy(desc(resources.isFavorite), asc(resources.order), desc(resources.id));
  }

  async findResource(id: number) {
    const [row] = await this.db.select().from(resources).where(eq(resources.id, id));
    if (!row) throw new NotFoundException('Resource not found');
    return row;
  }

  async createResource(dto: CreateResourceDto) {
    const [result] = await this.db.insert(resources).values(dto);
    return this.findResource(result.insertId);
  }

  async updateResource(id: number, dto: UpdateResourceDto) {
    await this.findResource(id);
    await this.db.update(resources).set(dto).where(eq(resources.id, id));
    return this.findResource(id);
  }

  async removeResource(id: number) {
    await this.findResource(id);
    await this.db.delete(resources).where(eq(resources.id, id));
    return { ok: true };
  }

  // --- Captura de metadata (Microlink) + rehospedaje del screenshot en R2 ---

  async capture(url: string) {
    const result = { title: '', description: '', thumbnail: '', favicon: '', url };
    try {
      const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`;
      const res = await fetch(api, { signal: AbortSignal.timeout(25000) });
      const json = (await res.json()) as {
        data?: {
          title?: string;
          description?: string;
          logo?: { url?: string };
          image?: { url?: string };
          screenshot?: { url?: string };
        };
      };
      const data = json.data ?? {};
      result.title = data.title ?? '';
      result.description = data.description ?? '';
      result.favicon = data.logo?.url ?? '';

      const shotUrl = data.screenshot?.url ?? data.image?.url ?? '';
      if (shotUrl) {
        try {
          const img = await fetch(shotUrl, { signal: AbortSignal.timeout(20000) });
          const buf = Buffer.from(await img.arrayBuffer());
          const mimetype = img.headers.get('content-type') ?? 'image/png';
          const ext = mimetype.includes('webp')
            ? 'webp'
            : mimetype.includes('jpeg')
              ? 'jpg'
              : 'png';
          const file = {
            buffer: buf,
            originalname: `shot.${ext}`,
            mimetype,
            size: buf.length,
          } as unknown as Express.Multer.File;
          const uploaded = await this.upload.upload(file, 'resources');
          result.thumbnail = uploaded.url || shotUrl;
        } catch {
          // Si falla el rehospedaje, dejamos la URL de Microlink.
          result.thumbnail = shotUrl;
        }
      }
    } catch {
      // Best-effort: si Microlink falla, devolvemos lo que haya (vacío).
    }
    return result;
  }
}
