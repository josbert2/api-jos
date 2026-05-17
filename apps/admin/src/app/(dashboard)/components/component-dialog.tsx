'use client';

import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { apiPatch, apiPost } from '@/lib/api';
import { Component } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, Checkbox } from '@/components/ui/field';
import { TagInput } from '@/components/ui/tag-input';
import { SingleUploader } from '@/components/Uploader';

const TYPES = [
  'registry:component',
  'registry:ui',
  'registry:block',
  'registry:hook',
  'registry:lib',
];

const selectClass =
  'h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none ' +
  'transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type FileDraft = { path: string; content: string };

export function ComponentDialog({
  open,
  onOpenChange,
  component,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: Component | null;
  onSaved: () => void;
}) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('josbert');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('registry:component');
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [registryDependencies, setRegistryDependencies] = useState<string[]>([]);
  const [files, setFiles] = useState<FileDraft[]>([{ path: '', content: '' }]);
  const [demo, setDemo] = useState('');
  const [preview, setPreview] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(component?.name ?? '');
    setAuthor(component?.author ?? 'josbert');
    setTitle(component?.title ?? '');
    setDescription(component?.description ?? '');
    setType(component?.type ?? 'registry:component');
    setDependencies(component?.dependencies ?? []);
    setRegistryDependencies(component?.registryDependencies ?? []);
    setFiles(
      component?.files?.length
        ? component.files.map((f) => ({ path: f.path, content: f.content }))
        : [{ path: '', content: '' }],
    );
    setDemo(component?.demo ?? '');
    setPreview(component?.preview ?? '');
    setIsPublished(component?.isPublished ?? true);
    setError(null);
  }, [open, component]);

  const setFile = (i: number, patch: Partial<FileDraft>) =>
    setFiles((fs) => fs.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const cleanFiles = files.filter((f) => f.path.trim() && f.content.trim());
      if (cleanFiles.length === 0) throw new Error('Agregá al menos un archivo con path y código.');
      const body = {
        name: name.trim(),
        author: author.trim() || 'josbert',
        title: title.trim(),
        description: description.trim() || undefined,
        type,
        dependencies,
        registryDependencies,
        files: cleanFiles.map((f) => ({ path: f.path.trim(), content: f.content, type })),
        demo: demo.trim() || undefined,
        preview: preview || undefined,
        isPublished,
      };
      if (component) await apiPatch(`/components/${component.id}`, body);
      else await apiPost('/components', body);
      onSaved();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <Dialog.Content
          style={{ boxShadow: '0 8px 28px -8px oklch(0.21 0.012 264 / 0.18)' }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-card p-6 focus:outline-none"
        >
          <Dialog.Title className="text-base font-semibold text-foreground">
            {component ? 'Editar componente' : 'Nuevo componente'}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Se publica como registry-item: instalable con <code>npx shadcn add</code>.
          </Dialog.Description>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name (slug)" hint="Va en la URL: /r/autor/name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="tube-cursor"
                  required
                />
              </Field>
              <Field label="Autor (usuario)">
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="josbert"
                />
              </Field>
            </div>

            <Field label="Título">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>

            <Field label="Descripción">
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Tipo">
                <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Dependencies (npm)">
                <TagInput value={dependencies} onChange={setDependencies} placeholder="Enter…" />
              </Field>
              <Field label="Registry deps">
                <TagInput
                  value={registryDependencies}
                  onChange={setRegistryDependencies}
                  placeholder="Enter…"
                />
              </Field>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                Archivos
              </span>
              {files.map((f, i) => (
                <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                  <div className="flex gap-2">
                    <Input
                      value={f.path}
                      onChange={(e) => setFile(i, { path: e.target.value })}
                      placeholder="src/components/ui/tube-cursor.tsx"
                    />
                    {files.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label="Quitar archivo"
                        onClick={() => setFiles((fs) => fs.filter((_, idx) => idx !== i))}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} className="text-destructive" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={f.content}
                    onChange={(e) => setFile(i, { content: e.target.value })}
                    placeholder="// código del componente…"
                    rows={8}
                    className="font-mono text-xs"
                    spellCheck={false}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() => setFiles((fs) => [...fs, { path: '', content: '' }])}
              >
                <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={2} />
                Agregar archivo
              </Button>
            </div>

            <Field
              label="Demo (código del preview)"
              hint="Componente que usa este registry-item. Se ve en el preview vivo, no se instala."
            >
              <Textarea
                value={demo}
                onChange={(e) => setDemo(e.target.value)}
                placeholder={'export default function Demo() {\n  return <MiComponente />;\n}'}
                rows={6}
                className="font-mono text-xs"
                spellCheck={false}
              />
            </Field>

            <div className="flex flex-col gap-1.5">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                Imagen de preview
              </span>
              <SingleUploader
                value={preview}
                onChange={setPreview}
                folder={`components/${name || 'nuevo'}`}
              />
            </div>

            <Checkbox
              label="Publicado (visible en el registry)"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={saving}>
                {component ? 'Guardar cambios' : 'Crear componente'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
