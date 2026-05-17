import {
  mysqlTable,
  int,
  varchar,
  text,
  boolean,
  timestamp,
  json,
  date,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  email: varchar('email', { length: 190 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 120 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const projects = mysqlTable('projects', {
  id: int('id').autoincrement().primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  summary: varchar('summary', { length: 500 }),
  description: text('description'),
  content: text('content'),
  coverImage: varchar('cover_image', { length: 500 }),
  images: json('images').$type<string[]>().default([]),
  tags: json('tags').$type<string[]>().default([]),
  stack: json('stack').$type<string[]>().default([]),
  linkLive: varchar('link_live', { length: 500 }),
  linkRepo: varchar('link_repo', { length: 500 }),
  client: varchar('client', { length: 200 }),
  date: date('date', { mode: 'string' }),
  order: int('order').default(0).notNull(),
  isBest: boolean('is_best').default(false).notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const experiences = mysqlTable('experiences', {
  id: int('id').autoincrement().primaryKey(),
  company: varchar('company', { length: 200 }).notNull(),
  role: varchar('role', { length: 200 }).notNull(),
  location: varchar('location', { length: 200 }),
  description: text('description'),
  startDate: date('start_date', { mode: 'string' }).notNull(),
  endDate: date('end_date', { mode: 'string' }),
  current: boolean('current').default(false).notNull(),
  order: int('order').default(0).notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const skills = mysqlTable('skills', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  category: varchar('category', { length: 120 }),
  level: int('level').default(0).notNull(),
  icon: varchar('icon', { length: 500 }),
  order: int('order').default(0).notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const contactMessages = mysqlTable('contact_messages', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  subject: varchar('subject', { length: 300 }),
  message: text('message').notNull(),
  status: mysqlEnum('status', ['new', 'read', 'archived']).default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bovedas de inspiracion: categorias + recursos (landings, links, etc.)
export const resourceCategories = mysqlTable('resource_categories', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  color: varchar('color', { length: 32 }),
  order: int('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const resources = mysqlTable('resources', {
  id: int('id').autoincrement().primaryKey(),
  url: varchar('url', { length: 1000 }).notNull(),
  title: varchar('title', { length: 300 }).notNull(),
  description: text('description'),
  thumbnail: varchar('thumbnail', { length: 1000 }),
  favicon: varchar('favicon', { length: 1000 }),
  tags: json('tags').$type<string[]>().default([]),
  categoryId: int('category_id'),
  notes: text('notes'),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  order: int('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// Registry propio estilo shadcn: cada fila es un registry-item instalable.
export const components = mysqlTable('components', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 160 }).notNull().unique(),
  author: varchar('author', { length: 80 }).default('josbert').notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  description: varchar('description', { length: 500 }),
  type: varchar('type', { length: 60 }).default('registry:component').notNull(),
  dependencies: json('dependencies').$type<string[]>().default([]),
  registryDependencies: json('registry_dependencies').$type<string[]>().default([]),
  files: json('files')
    .$type<{ path: string; content: string; type: string }[]>()
    .default([]),
  tags: json('tags').$type<string[]>().default([]),
  preview: varchar('preview', { length: 1000 }),
  isPublished: boolean('is_published').default(true).notNull(),
  order: int('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type ResourceCategory = typeof resourceCategories.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type Component = typeof components.$inferSelect;
