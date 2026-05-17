export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  content: string | null;
  coverImage: string | null;
  images: string[];
  tags: string[];
  stack: string[];
  linkLive: string | null;
  linkRepo: string | null;
  client: string | null;
  date: string | null;
  order: number;
  isBest: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string | null;
  level: number;
  icon: string | null;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'archived';
  createdAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
}

export interface ResourceCategory {
  id: number;
  name: string;
  slug: string;
  color: string | null;
  order: number;
  createdAt: string;
}

export interface Resource {
  id: number;
  url: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  favicon: string | null;
  tags: string[];
  categoryId: number | null;
  notes: string | null;
  isFavorite: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegistryFile {
  path: string;
  content: string;
  type: string;
}

export interface Component {
  id: number;
  name: string;
  author: string;
  title: string;
  description: string | null;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
  demo: string | null;
  tags: string[];
  preview: string | null;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
