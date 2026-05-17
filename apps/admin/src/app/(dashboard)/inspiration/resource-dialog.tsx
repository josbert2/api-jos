'use client';

import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import { Image02Icon, MagicWand01Icon } from '@hugeicons/core-free-icons';
import { apiPatch, apiPost } from '@/lib/api';
import { Resource, ResourceCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, Checkbox } from '@/components/ui/field';
import { TagInput } from '@/components/ui/tag-input';

interface CaptureResult {
  title: string;
  description: string;
  thumbnail: string;
  favicon: string;
}

const selectClass =
  'h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none ' +
  'transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function ResourceDialog({
  open,
  onOpenChange,
  resource,
  categories,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: Resource | null;
  categories: ResourceCategory[];
  onSaved: () => void;
}) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [favicon, setFavicon] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setUrl(resource?.url ?? '');
    setTitle(resource?.title ?? '');
    setDescription(resource?.description ?? '');
    setThumbnail(resource?.thumbnail ?? '');
    setFavicon(resource?.favicon ?? '');
    setTags(resource?.tags ?? []);
    setCategoryId(resource?.categoryId ?? null);
    setNotes(resource?.notes ?? '');
    setIsFavorite(resource?.isFavorite ?? false);
    setError(null);
  }, [open, resource]);

  async function capture() {
    const u = url.trim();
    if (!u || capturing) return;
    setCapturing(true);
    setError(null);
    try {
      const r = await apiPost<CaptureResult>('/resources/capture', { url: u });
      if (r.title) setTitle(r.title);
      if (r.description) setDescription(r.description);
      if (r.thumbnail) setThumbnail(r.thumbnail);
      if (r.favicon) setFavicon(r.favicon);
      if (!r.title && !r.thumbnail) {
        setError('No se pudo capturar la preview. Completá los datos a mano.');
      }
    } catch {
      setError('La captura falló. Completá los datos a mano.');
    } finally {
      setCapturing(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = {
        url: url.trim(),
        title: title.trim(),
        description: description.trim() || undefined,
        thumbnail: thumbnail || undefined,
        favicon: favicon || undefined,
        tags,
        categoryId,
        notes: notes.trim() || undefined,
        isFavorite,
      };
      if (resource) await apiPatch(`/resources/${resource.id}`, body);
      else await apiPost('/resources', body);
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
          className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-card p-6 focus:outline-none"
        >
          <Dialog.Title className="text-base font-semibold text-foreground">
            {resource ? 'Editar recurso' : 'Nuevo recurso'}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Pegá una URL y capturá la preview, o cargá los datos a mano.
          </Dialog.Description>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
            <Field label="URL">
              <div className="flex gap-2">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://…"
                  required
                  autoFocus
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={capture}
                  loading={capturing}
                  disabled={!url.trim()}
                  className="shrink-0"
                >
                  {!capturing && <HugeiconsIcon icon={MagicWand01Icon} size={15} />}
                  {capturing ? 'Capturando…' : 'Capturar'}
                </Button>
              </div>
            </Field>

            {thumbnail ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={thumbnail}
                alt=""
                className="aspect-[16/10] w-full rounded-lg border border-border object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] w-full place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
                <div className="flex flex-col items-center gap-1.5">
                  <HugeiconsIcon icon={Image02Icon} size={22} />
                  <span className="text-xs">Sin preview</span>
                </div>
              </div>
            )}

            <Field label="Título">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>

            <Field label="Descripción">
              <Textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Categoría">
                <select
                  value={categoryId ?? ''}
                  onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
                  className={selectClass}
                >
                  <option value="">Sin categoría</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tags">
                <TagInput value={tags} onChange={setTags} placeholder="Enter para agregar" />
              </Field>
            </div>

            <Field label="Notas">
              <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>

            <Checkbox
              label="Marcar como favorito"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={saving}>
                {resource ? 'Guardar cambios' : 'Guardar recurso'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
