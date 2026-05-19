'use client';

import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  Globe02Icon,
  Link01Icon,
  Loading03Icon,
  PencilEdit02Icon,
  RefreshIcon,
  StarIcon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { apiPatch, apiPost } from '@/lib/api';
import { Resource, ResourceCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface CaptureResult {
  title: string;
  description: string;
  thumbnail: string;
  favicon: string;
}

const toolBtn =
  'grid h-8 w-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors ' +
  'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring ' +
  'disabled:opacity-50 disabled:pointer-events-none';

export function ResourceDetailModal({
  resource,
  category,
  open,
  onOpenChange,
  onEdit,
  onToggleFavorite,
  onChanged,
}: {
  resource: Resource | null;
  category?: ResourceCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (r: Resource) => void;
  onToggleFavorite: (r: Resource) => void;
  onChanged: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'shot' | 'live'>('shot');
  const [recapturing, setRecapturing] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setMode('shot');
      setRecapturing(false);
    }
  }, [open]);

  const r = resource;

  function copy() {
    if (!r) return;
    navigator.clipboard?.writeText(r.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  async function recapture() {
    if (!r) return;
    setRecapturing(true);
    try {
      const cap = await apiPost<CaptureResult>('/resources/capture', { url: r.url });
      await apiPatch(`/resources/${r.id}`, {
        thumbnail: cap.thumbnail || undefined,
        favicon: cap.favicon || undefined,
      });
      onChanged();
    } finally {
      setRecapturing(false);
    }
  }

  return (
    <Drawer position="right" open={open} onOpenChange={onOpenChange}>
      <DrawerPopup variant="inset" showCloseButton={false}>
        <DrawerHeader allowSelection={false} className="gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            {r?.favicon ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={r.favicon} alt="" className="h-4 w-4 shrink-0 rounded-sm" />
            ) : (
              <HugeiconsIcon
                icon={Globe02Icon}
                size={15}
                className="shrink-0 text-muted-foreground"
              />
            )}
            <DrawerTitle className="line-clamp-1 flex-1 text-sm font-medium">
              {r?.title ?? ''}
            </DrawerTitle>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => r && onToggleFavorite(r)}
              aria-label={r?.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
              aria-pressed={r?.isFavorite}
              className={toolBtn}
            >
              <HugeiconsIcon
                icon={StarIcon}
                size={16}
                className={r?.isFavorite ? 'text-accent' : undefined}
              />
            </button>
            <button
              type="button"
              onClick={recapture}
              disabled={recapturing}
              aria-label="Recapturar preview"
              className={toolBtn}
            >
              <HugeiconsIcon
                icon={recapturing ? Loading03Icon : RefreshIcon}
                size={16}
                className={recapturing ? 'animate-spin' : undefined}
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
              onClick={() => r && onEdit(r)}
              aria-label="Editar"
              className={toolBtn}
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
            </button>
            <Button asChild size="sm">
              <a href={r?.url} target="_blank" rel="noreferrer">
                Abrir
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
              </a>
            </Button>
            <DrawerClose
              aria-label="Cerrar"
              className={cn(toolBtn, 'ml-0.5')}
            />
          </div>
        </DrawerHeader>

        <DrawerPanel scrollable scrollFade className="px-4 py-4">
          {r && (
            <>
              <div className="mb-3 flex justify-end">
                <div className="inline-flex rounded-md border border-border p-0.5">
                  {(['shot', 'live'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m);
                        if (m === 'live') setIframeLoading(true);
                      }}
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

              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
                {mode === 'live' ? (
                  <>
                    <iframe
                      src={r.url}
                      title={r.title}
                      onLoad={() => setIframeLoading(false)}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      className="h-full w-full border-0"
                    />
                    {iframeLoading && (
                      <div className="absolute inset-0 grid place-items-center bg-muted">
                        <HugeiconsIcon
                          icon={Loading03Icon}
                          size={22}
                          className="animate-spin text-muted-foreground"
                        />
                      </div>
                    )}
                  </>
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
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
            </>
          )}
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
