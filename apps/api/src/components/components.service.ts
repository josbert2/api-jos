import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../db/drizzle.module';
import { components } from '../db/schema';
import { CreateComponentDto, UpdateComponentDto } from './components.dto';

@Injectable()
export class ComponentsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  // Solo los componentes del usuario autenticado.
  findAll(userId: number) {
    return this.db
      .select()
      .from(components)
      .where(eq(components.userId, userId))
      .orderBy(asc(components.order), asc(components.id));
  }

  async findOne(id: number) {
    const [row] = await this.db.select().from(components).where(eq(components.id, id));
    if (!row) throw new NotFoundException('Component not found');
    return row;
  }

  // findOne + chequeo de propiedad.
  async findOwned(id: number, userId: number) {
    const row = await this.findOne(id);
    if (row.userId !== userId) throw new ForbiddenException('No es tu componente');
    return row;
  }

  async create(dto: CreateComponentDto, userId: number, author: string) {
    const [result] = await this.db.insert(components).values({ ...dto, userId, author });
    return this.findOne(result.insertId);
  }

  async update(id: number, dto: UpdateComponentDto, userId: number) {
    await this.findOwned(id, userId);
    // userId/author no se reasignan desde el body
    const { author: _author, ...patch } = dto;
    void _author;
    await this.db.update(components).set(patch).where(eq(components.id, id));
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    await this.findOwned(id, userId);
    await this.db
      .delete(components)
      .where(and(eq(components.id, id), eq(components.userId, userId)));
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
