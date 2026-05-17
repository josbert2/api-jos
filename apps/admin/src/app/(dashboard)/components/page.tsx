'use client';

import { useEffect, useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Copy01Icon,
  Delete02Icon,
  PackageIcon,
  PencilEdit02Icon,
  PlusSignIcon,
  Search01Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet } from '@/lib/api';
import { Component } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ComponentDialog } from './component-dialog';
import { ComponentDetailModal } from './component-detail-modal';

const REGISTRY_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/r';

export default function ComponentsPage() {
  const [items, setItems] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Component | null>(null);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [toDelete, setToDelete] = useState<Component | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      setItems(await apiGet<Component[]>('/components'));
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) =>
      `${c.name} ${c.title} ${c.description ?? ''} ${c.tags.join(' ')}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const viewing = items.find((c) => c.id === viewingId) ?? null;

  function copyCmd(c: Component) {
    navigator.clipboard
      ?.writeText(`npx shadcn@latest add ${REGISTRY_BASE}/${c.author}/${c.name}`)
      .then(() => {
      setCopiedId(c.id);
      setTimeout(() => setCopiedId((id) => (id === c.id ? null : id)), 1600);
    });
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiDelete(`/components/${toDelete.id}`);
      setToDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  function openNew() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(c: Component) {
    setEditing(c);
    setDialogOpen(true);
  }

  return (
    <div>
      <PageHeader title="Componentes" description="Tu registry: componentes instalables con shadcn.">
        <Button onClick={openNew}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
          Nuevo
        </Button>
      </PageHeader>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-border p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      ) : loadError ? (
        <EmptyState
          icon={AlertCircleIcon}
          title="No se pudo cargar"
          description="Hubo un problema al traer el registry."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={PackageIcon}
          title="Tu registry está vacío"
          description="Creá tu primer componente — instalable con npx shadcn add."
          action={
            <Button onClick={openNew}>
              <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
              Nuevo componente
            </Button>
          }
        />
      ) : (
        <>
          <div className="relative mb-5 max-w-xs">
            <HugeiconsIcon
              icon={Search01Icon}
              size={15}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="h-9 w-full rounded-md border border-input bg-card pl-8 pr-3 text-sm text-foreground caret-ring outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </div>

          {visible.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
              Nada coincide con la búsqueda.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((c) => (
                <div
                  key={c.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
                >
                  <button
                    type="button"
                    onClick={() => setViewingId(c.id)}
                    aria-label={`Ver ${c.title}`}
                    className="block aspect-[16/10] w-full overflow-hidden bg-muted outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    {c.preview ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={c.preview}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-muted-foreground">
                        <HugeiconsIcon icon={PackageIcon} size={26} />
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingId(c.id)}
                    className="flex-1 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-medium text-foreground">
                        {c.title}
                      </h3>
                      <Badge variant={c.isPublished ? 'accent' : 'warning'}>
                        {c.isPublished ? c.type.replace('registry:', '') : 'borrador'}
                      </Badge>
                    </div>
                    <code className="mt-1 block font-mono text-xs text-muted-foreground">
                      {c.name}
                    </code>
                    {c.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    )}
                  </button>

                  <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
                    <span className="text-xs text-muted-foreground">
                      {c.files.length} {c.files.length === 1 ? 'archivo' : 'archivos'}
                      {c.dependencies.length > 0 && ` · ${c.dependencies.length} deps`}
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => copyCmd(c)}>
                      <HugeiconsIcon
                        icon={copiedId === c.id ? Tick02Icon : Copy01Icon}
                        size={14}
                        className={copiedId === c.id ? 'text-accent' : undefined}
                      />
                      {copiedId === c.id ? 'Copiado' : 'Install'}
                    </Button>
                  </div>

                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEdit(c)}
                      aria-label={`Editar ${c.title}`}
                      className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <HugeiconsIcon icon={PencilEdit02Icon} size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(c)}
                      aria-label={`Borrar ${c.title}`}
                      className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground outline-none transition-colors hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <ComponentDetailModal
        component={viewing}
        open={viewingId !== null}
        onOpenChange={(o) => !o && setViewingId(null)}
        onEdit={(c) => {
          setViewingId(null);
          openEdit(c);
        }}
      />
      <ComponentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        component={editing}
        onSaved={load}
      />
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Borrar componente"
        description={
          toDelete ? `"${toDelete.title}" se va a eliminar del registry.` : undefined
        }
        confirmLabel="Borrar"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
