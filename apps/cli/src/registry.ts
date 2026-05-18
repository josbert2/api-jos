import type { PublicProfile, RegistryComponent } from './types.js';

const API_BASE = (process.env.JOSBERT_API ?? 'https://api.josbert.dev') + '/api';
export const REGISTRY_BASE = process.env.JOSBERT_REGISTRY ?? 'https://api.josbert.dev/r';
export const DEFAULT_AUTHOR = process.env.JOSBERT_AUTHOR ?? 'josbert';

export function registryUrl(author: string, name: string): string {
  return `${REGISTRY_BASE}/${author}/${name}`;
}

export async function fetchRegistryComponent(author: string, name: string): Promise<RegistryComponent> {
  const url = registryUrl(author, name);
  const res = await fetch(url);
  if (res.status === 404) throw new Error(`Componente "${author}/${name}" no encontrado en el registry.`);
  if (!res.ok) throw new Error(`Error ${res.status} al consultar ${url}`);
  return res.json() as Promise<RegistryComponent>;
}

export async function fetchUserProfile(username: string): Promise<PublicProfile> {
  const url = `${API_BASE}/users/${username}`;
  const res = await fetch(url);
  if (res.status === 404) throw new Error(`Usuario "${username}" no encontrado.`);
  if (!res.ok) throw new Error(`Error ${res.status} al consultar la API.`);
  return res.json() as Promise<PublicProfile>;
}
