import fs from 'node:fs';
import path from 'node:path';
import type { ManifestEntry } from './types.js';

export const MANIFEST_FILE = 'josbert-registry.json';

export function readManifest(cwd: string = process.cwd()): ManifestEntry[] {
  const p = path.join(cwd, MANIFEST_FILE);
  if (!fs.existsSync(p)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function writeManifest(entries: ManifestEntry[], cwd: string = process.cwd()): void {
  const p = path.join(cwd, MANIFEST_FILE);
  fs.writeFileSync(p, JSON.stringify(entries, null, 2));
}

export function upsertManifest(entry: ManifestEntry, cwd: string = process.cwd()): void {
  const entries = readManifest(cwd);
  const idx = entries.findIndex((e) => e.name === entry.name && e.author === entry.author);
  if (idx >= 0) {
    entries[idx] = entry;
  } else {
    entries.push(entry);
  }
  writeManifest(entries, cwd);
}

export function removeFromManifest(name: string, author: string, cwd: string = process.cwd()): boolean {
  const entries = readManifest(cwd);
  const next = entries.filter((e) => !(e.name === name && e.author === author));
  if (next.length === entries.length) return false;
  writeManifest(next, cwd);
  return true;
}
