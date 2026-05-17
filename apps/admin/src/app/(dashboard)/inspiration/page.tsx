'use client';

import { useEffect, useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Delete02Icon,
  FolderLibraryIcon,
  Globe02Icon,
  PencilEdit02Icon,
  PlusSignIcon,
  SparklesIcon,
  StarIcon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet, apiPatch } from '@/lib/api';
import { Resource, ResourceCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { cn } from '@/lib/utils';
import { ResourceDialog } from './resource-dialog';
import { CategoriesDialog } from './categories-dialog';

type Filter = 'all' | 'fav' | number;

export default function InspirationPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Resource | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      const [res, cats] = await Promise.all([
        apiGet<Resource[]>('/resources'),
        apiGet<ResourceCategory[]>('/resources/categories'),
      ]);
      setResources(res);
      setCategories(cats);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const catById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );

  const visible = useMemo(() => {
    if (filter === 'all') return resources;
    if (filter === 'fav') return resources.filter((r) => r.isFavorite);
    return resources.filter((r) => r.categoryId === filter);
  }, [resources, filter]);

  async function toggleFavorite(r: Resource) {
    const next = !r.isFavorite;
    setResources((list) =>
      list.map((x) => (x.id === r.id ? { ...x, isFavorite: next } : x)),
    );
    try {
      await apiPatch(`/resources/${r.id}`, { isFavorite: next });
    } catch {
      setResources((list) =>
        list.map((x) => (x.id === r.id ? { ...x, isFavorite: r.isFavorite } : x)),
      );
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiDelete(`/resources/${toDelete.id}`);
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

  function openEdit(r: Resource) {
    setEditing(r);
    setDialogOpen(true);
  }

  const chip = (active: boolean) =>
    cn(
      'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm outline-none transition-colors',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-card text-muted-foreground hover:text-foreground',
    );

  return (
    <div>
      <PageHeader title="Inspiración" description="Tu bóveda de links y landing pages.">
        <Button variant="outline" onClick={() => setCategoriesOpen(true)}>
          <HugeiconsIcon icon={FolderLibraryIcon} size={16} />
          Categorías
        </Button>
        <Button onClick={openNew}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
          Agregar
        </Button>
      </PageHeader>

      {!loading && !loadError && resources.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button type="button" className={chip(filter === 'all')} onClick={() => setFilter('all')}>
            Todos
            <span className="tabular-nums opacity-60">{resources.length}</span>
          </button>
          <button type="button" className={chip(filter === 'fav')} onClick={() => setFilter('fav')}>
            <HugeiconsIcon icon={StarIcon} size={13} />
            Favoritos
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(filter === c.id)}
              onClick={() => setFilter(c.id)}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.color ?? 'oklch(0.55 0.03 264)' }}
              />
              {c.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <Skeleton className="aspect-[16/10] rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : loadError ? (
        <EmptyState
          icon={AlertCircleIcon}
          title="No se pudo cargar"
          description="Hubo un problema al traer tu bóveda."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : resources.length === 0 ? (
        <EmptyState
          icon={SparklesIcon}
          title="Tu bóveda está vacía"
          description="Guardá tu primera landing o link de interés con su preview."
          action={
            <Button onClick={openNew}>
              <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
              Agregar recurso
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
          Nada en este filtro todavía.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((r) => {
            const cat = r.categoryId ? catById.get(r.categoryId) : undefined;
            return (
              <div
                key={r.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block aspect-[16/10] overflow-hidden bg-muted"
                >
                  {r.thumbnail ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={r.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <HugeiconsIcon icon={Globe02Icon} size={26} />
                    </div>
                  )}
                </a>

                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => openEdit(r)}
                    aria-label={`Editar ${r.title}`}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <HugeiconsIcon icon={PencilEdit02Icon} size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(r)}
                    aria-label={`Borrar ${r.title}`}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground outline-none transition-colors hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={15} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="flex items-start gap-2">
                    {r.favicon ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={r.favicon} alt="" className="mt-0.5 h-4 w-4 shrink-0 rounded-sm" />
                    ) : (
                      <HugeiconsIcon
                        icon={Globe02Icon}
                        size={15}
                        className="mt-0.5 shrink-0 text-muted-foreground"
                      />
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="line-clamp-1 flex-1 text-sm font-medium text-foreground hover:underline"
                    >
                      {r.title}
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(r)}
                      aria-label={r.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                      aria-pressed={r.isFavorite}
                      className="-mt-0.5 -mr-0.5 grid h-6 w-6 shrink-0 place-items-center rounded outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <HugeiconsIcon
                        icon={StarIcon}
                        size={15}
                        className={r.isFavorite ? 'text-accent' : 'text-muted-foreground/50'}
                      />
                    </button>
                  </div>

                  {r.description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {r.description}
                    </p>
                  )}

                  {(cat || r.tags.length > 0) && (
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
                      {cat && (
                        <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: cat.color ?? 'oklch(0.55 0.03 264)' }}
                          />
                          {cat.name}
                        </span>
                      )}
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ResourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        resource={editing}
        categories={categories}
        onSaved={load}
      />
      <CategoriesDialog
        open={categoriesOpen}
        onOpenChange={setCategoriesOpen}
        categories={categories}
        onChanged={load}
      />
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Borrar recurso"
        description={
          toDelete ? `"${toDelete.title}" se va a eliminar de tu bóveda.` : undefined
        }
        confirmLabel="Borrar"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
