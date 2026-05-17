'use client';

import { useEffect, useMemo, useState } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Delete02Icon,
  FolderLibraryIcon,
  Globe02Icon,
  PencilEdit02Icon,
  PlusSignIcon,
  Search01Icon,
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
import { ResourceDetailModal } from './resource-detail-modal';

type Filter = 'all' | 'fav' | number;

function FilterRow({
  active,
  label,
  count,
  icon,
  dot,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  icon?: IconSvgElement;
  dot?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'bg-muted font-medium text-foreground'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      {icon && <HugeiconsIcon icon={icon} size={15} className="shrink-0" />}
      {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />}
      <span className="flex-1 truncate text-left">{label}</span>
      {count !== undefined && (
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground/60">{count}</span>
      )}
    </button>
  );
}

export default function InspirationPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [viewingId, setViewingId] = useState<number | null>(null);
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

  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const favCount = useMemo(() => resources.filter((r) => r.isFavorite).length, [resources]);
  const countByCategory = useMemo(() => {
    const m = new Map<number, number>();
    for (const r of resources) {
      if (r.categoryId) m.set(r.categoryId, (m.get(r.categoryId) ?? 0) + 1);
    }
    return m;
  }, [resources]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (filter === 'fav' && !r.isFavorite) return false;
      if (typeof filter === 'number' && r.categoryId !== filter) return false;
      if (q) {
        const hay = `${r.title} ${r.url} ${r.tags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [resources, filter, query]);

  const viewing = resources.find((r) => r.id === viewingId) ?? null;

  async function toggleFavorite(r: Resource) {
    const next = !r.isFavorite;
    setResources((list) => list.map((x) => (x.id === r.id ? { ...x, isFavorite: next } : x)));
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
      ) : (
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Panel de filtros */}
          <aside className="md:w-52 md:shrink-0">
            <div className="space-y-4 md:sticky md:top-8">
              <div className="relative">
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

              <div className="space-y-0.5">
                <FilterRow
                  active={filter === 'all'}
                  label="Todos"
                  count={resources.length}
                  onClick={() => setFilter('all')}
                />
                <FilterRow
                  active={filter === 'fav'}
                  label="Favoritos"
                  icon={StarIcon}
                  count={favCount}
                  onClick={() => setFilter('fav')}
                />
              </div>

              <div>
                <h3 className="mb-1 px-2 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  Categorías
                </h3>
                <div className="space-y-0.5">
                  {categories.length === 0 ? (
                    <p className="px-2 py-1 text-xs text-muted-foreground">Sin categorías.</p>
                  ) : (
                    categories.map((c) => (
                      <FilterRow
                        key={c.id}
                        active={filter === c.id}
                        label={c.name}
                        dot={c.color ?? 'oklch(0.55 0.03 264)'}
                        count={countByCategory.get(c.id) ?? 0}
                        onClick={() => setFilter(c.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Galería */}
          <div className="min-w-0 flex-1">
            {visible.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
                {query.trim() ? 'Nada coincide con la búsqueda.' : 'Nada en este filtro todavía.'}
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((r) => {
                  const cat = r.categoryId ? catById.get(r.categoryId) : undefined;
                  return (
                    <div
                      key={r.id}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
                    >
                      <button
                        type="button"
                        onClick={() => setViewingId(r.id)}
                        aria-label={`Ver ${r.title}`}
                        className="block aspect-[16/10] w-full overflow-hidden bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
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
                      </button>

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
                            <img
                              src={r.favicon}
                              alt=""
                              className="mt-0.5 h-4 w-4 shrink-0 rounded-sm"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={Globe02Icon}
                              size={15}
                              className="mt-0.5 shrink-0 text-muted-foreground"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => setViewingId(r.id)}
                            className="line-clamp-1 flex-1 text-left text-sm font-medium text-foreground outline-none hover:underline focus-visible:underline"
                          >
                            {r.title}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(r)}
                            aria-label={r.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                            aria-pressed={r.isFavorite}
                            className="-mr-0.5 -mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <HugeiconsIcon
                              icon={StarIcon}
                              size={15}
                              className={
                                r.isFavorite ? 'text-accent' : 'text-muted-foreground/50'
                              }
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
          </div>
        </div>
      )}

      <ResourceDetailModal
        resource={viewing}
        category={viewing?.categoryId ? catById.get(viewing.categoryId) : undefined}
        open={viewingId !== null}
        onOpenChange={(o) => !o && setViewingId(null)}
        onEdit={(r) => {
          setViewingId(null);
          openEdit(r);
        }}
        onToggleFavorite={toggleFavorite}
        onChanged={load}
      />
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
        description={toDelete ? `"${toDelete.title}" se va a eliminar de tu bóveda.` : undefined}
        confirmLabel="Borrar"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
