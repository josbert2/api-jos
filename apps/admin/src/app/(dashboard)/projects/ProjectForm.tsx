'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPatch, apiPost } from '@/lib/api';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, Checkbox } from '@/components/ui/field';
import { TagInput } from '@/components/ui/tag-input';
import { SingleUploader, MultiUploader } from '@/components/Uploader';

type Draft = Partial<Project>;

const emptyDraft: Draft = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  content: '',
  coverImage: '',
  images: [],
  tags: [],
  stack: [],
  linkLive: '',
  linkRepo: '',
  client: '',
  date: '',
  order: 0,
  isBest: false,
  isPublished: true,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// Bloque etiquetado para controles que no son un input unico (uploaders, tag input).
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function ProjectForm({ initial }: { initial?: Project }) {
  const router = useRouter();
  const [p, setP] = useState<Draft>(initial ?? emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setP((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { id, createdAt, updatedAt, ...rest } = p as Project;
      const payload = { ...rest, date: p.date || undefined };
      if (initial?.id) await apiPatch(`/projects/${initial.id}`, payload);
      else await apiPost('/projects', payload);
      router.push('/projects');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el proyecto.');
    } finally {
      setSaving(false);
    }
  }

  const folder = p.slug ? `projects/${p.slug}` : 'projects';

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <Section title="Básico">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título">
            <Input value={p.title ?? ''} onChange={(e) => set('title', e.target.value)} required />
          </Field>
          <Field label="Slug">
            <Input value={p.slug ?? ''} onChange={(e) => set('slug', e.target.value)} required />
          </Field>
          <Field label="Cliente">
            <Input value={p.client ?? ''} onChange={(e) => set('client', e.target.value)} />
          </Field>
          <Field label="Fecha">
            <Input type="date" value={p.date ?? ''} onChange={(e) => set('date', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Contenido">
        <div className="space-y-4">
          <Field label="Resumen">
            <Input value={p.summary ?? ''} onChange={(e) => set('summary', e.target.value)} />
          </Field>
          <Field label="Descripción">
            <Textarea
              rows={4}
              value={p.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>
          <Field label="Contenido (markdown)">
            <Textarea
              rows={8}
              value={p.content ?? ''}
              onChange={(e) => set('content', e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Imágenes">
        <div className="space-y-4">
          <Block label="Imagen de portada">
            <SingleUploader
              value={p.coverImage}
              onChange={(url) => set('coverImage', url)}
              folder={folder}
            />
          </Block>
          <Block label="Galería">
            <MultiUploader
              value={p.images ?? []}
              onChange={(urls) => set('images', urls)}
              folder={folder}
            />
          </Block>
        </div>
      </Section>

      <Section title="Tecnologías">
        <div className="grid gap-4 sm:grid-cols-2">
          <Block label="Tags">
            <TagInput
              value={p.tags ?? []}
              onChange={(v) => set('tags', v)}
              placeholder="Enter para agregar"
            />
          </Block>
          <Block label="Stack">
            <TagInput
              value={p.stack ?? []}
              onChange={(v) => set('stack', v)}
              placeholder="Enter para agregar"
            />
          </Block>
        </div>
      </Section>

      <Section title="Enlaces">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Link demo">
            <Input
              type="url"
              value={p.linkLive ?? ''}
              onChange={(e) => set('linkLive', e.target.value)}
            />
          </Field>
          <Field label="Link repo">
            <Input
              type="url"
              value={p.linkRepo ?? ''}
              onChange={(e) => set('linkRepo', e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Publicación">
        <div className="space-y-4">
          <Field label="Orden" className="max-w-[160px]">
            <Input
              type="number"
              value={p.order ?? 0}
              onChange={(e) => set('order', Number(e.target.value))}
            />
          </Field>
          <div className="flex flex-wrap gap-6">
            <Checkbox
              label="Proyecto destacado"
              checked={!!p.isBest}
              onChange={(e) => set('isBest', e.target.checked)}
            />
            <Checkbox
              label="Publicado"
              checked={!!p.isPublished}
              onChange={(e) => set('isPublished', e.target.checked)}
            />
          </div>
        </div>
      </Section>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2 border-t border-border pt-6">
        <Button type="submit" loading={saving}>
          Guardar proyecto
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
