'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  Globe02Icon,
  Link01Icon,
  PencilEdit02Icon,
  StarIcon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { Resource, ResourceCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const toolBtn =
  'grid h-8 w-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors ' +
  'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring';

export function ResourceDetailModal({
  resource,
  category,
  open,
  onOpenChange,
  onEdit,
  onToggleFavorite,
}: {
  resource: Resource | null;
  category?: ResourceCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (r: Resource) => void;
  onToggleFavorite: (r: Resource) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'shot' | 'live'>('shot');

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setMode('shot');
    }
  }, [open]);

  if (!resource) return null;
  const r = resource;

  function copy() {
    navigator.clipboard?.writeText(r.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <Dialog.Content
          style={{ boxShadow: '0 8px 28px -8px oklch(0.21 0.012 264 / 0.18)' }}
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[88vh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-card focus:outline-none"
        >
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            {r.favicon ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={r.favicon} alt="" className="ml-1 h-4 w-4 shrink-0 rounded-sm" />
            ) : (
              <HugeiconsIcon
                icon={Globe02Icon}
                size={15}
                className="ml-1 shrink-0 text-muted-foreground"
              />
            )}
            <Dialog.Title className="line-clamp-1 flex-1 text-sm font-medium text-foreground">
              {r.title}
            </Dialog.Title>

            <button
              type="button"
              onClick={() => onToggleFavorite(r)}
              aria-label={r.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
              aria-pressed={r.isFavorite}
              className={toolBtn}
            >
              <HugeiconsIcon
                icon={StarIcon}
                size={16}
                className={r.isFavorite ? 'text-accent' : undefined}
              />
            </button>
            <button type="button" onClick={copy} aria-label="Copiar link" className={toolBtn}>
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Link01Icon}
                size={16}
                className={copied ? 'text-accent' : undefined}
              />
            </button>
            <button
              type="button"
              onClick={() => onEdit(r)}
              aria-label="Editar"
              className={toolBtn}
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
            </button>
            <Button asChild size="sm">
              <a href={r.url} target="_blank" rel="noreferrer">
                Abrir
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
              </a>
            </Button>
            <Dialog.Close aria-label="Cerrar" className={cn(toolBtn, 'ml-0.5')}>
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-5">
            <div className="mb-2 flex justify-end">
              <div className="inline-flex rounded-md border border-border p-0.5">
                {(['shot', 'live'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={cn(
                      'rounded px-2.5 py-1 text-xs font-medium outline-none transition-colors',
                      'focus-visible:ring-2 focus-visible:ring-ring',
                      mode === m
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {m === 'shot' ? 'Imagen' : 'En vivo'}
                  </button>
                ))}
              </div>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
              {mode === 'live' ? (
                <iframe
                  src={r.url}
                  title={r.title}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  className="h-full w-full border-0"
                />
              ) : r.thumbnail ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={r.thumbnail} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground">
                  <HugeiconsIcon icon={Globe02Icon} size={32} />
                </div>
              )}
            </div>
            {mode === 'live' && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Si la página queda en blanco, el sitio bloquea el embebido. Usá «Abrir».
              </p>
            )}

            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block break-all font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {r.url}
            </a>

            {r.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
            )}

            {(category || r.tags.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {category && (
                  <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: category.color ?? 'oklch(0.55 0.03 264)' }}
                    />
                    {category.name}
                  </span>
                )}
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {r.notes && (
              <div className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-3 text-sm text-foreground">
                {r.notes}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
