import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../db/drizzle.module';
import { components } from '../db/schema';
import { CreateComponentDto, UpdateComponentDto } from './components.dto';

@Injectable()
export class ComponentsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  findAll() {
    return this.db
      .select()
      .from(components)
      .orderBy(asc(components.order), asc(components.id));
  }

  async findOne(id: number) {
    const [row] = await this.db.select().from(components).where(eq(components.id, id));
    if (!row) throw new NotFoundException('Component not found');
    return row;
  }

  async create(dto: CreateComponentDto) {
    const [result] = await this.db.insert(components).values(dto);
    return this.findOne(result.insertId);
  }

  async update(id: number, dto: UpdateComponentDto) {
    await this.findOne(id);
    await this.db.update(components).set(dto).where(eq(components.id, id));
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.db.delete(components).where(eq(components.id, id));
    return { ok: true };
  }

  // registry-item JSON que consume `npx shadcn add` — ruta /r/:author/:name
  async registryItem(author: string, name: string) {
    const [row] = await this.db.select().from(components).where(eq(components.name, name));
    if (!row || !row.isPublished || row.author !== author) {
      throw new NotFoundException('Registry item not found');
    }
    return {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: row.name,
      type: row.type,
      title: row.title,
      description: row.description ?? undefined,
      dependencies: row.dependencies ?? [],
      registryDependencies: row.registryDependencies ?? [],
      files: (row.files ?? []).map((f) => ({
        path: f.path,
        content: f.content,
        type: f.type || row.type,
      })),
    };
  }
}
