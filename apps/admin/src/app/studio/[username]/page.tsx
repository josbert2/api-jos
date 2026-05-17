'use client';

import { useEffect, useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  ComputerTerminal01Icon,
  Copy01Icon,
  Delete02Icon,
  FavouriteIcon,
  PackageIcon,
  PencilEdit02Icon,
  PlusSignIcon,
  Search01Icon,
  SourceCodeIcon,
  SparklesIcon,
  SquareLock01Icon,
  Tick02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet } from '@/lib/api';
import { Component } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ComponentDialog } from '@/app/(dashboard)/components/component-dialog';
import { ComponentDetailModal } from '@/app/(dashboard)/components/component-detail-modal';
import { useStudioUser } from './studio-context';

const REGISTRY_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/r';

type Tab = 'published' | 'review' | 'draft';

// Tarjetas de analítica: aún no medimos nada, van como "sin datos" (fiel al diseño de 21st).
const STAT_CARDS = [
  { key: 'views', label: 'Views', icon: ViewIcon },
  { key: 'code', label: 'Code Copies', icon: SourceCodeIcon },
  { key: 'prompt', label: 'Prompt Copies', icon: SparklesIcon },
  { key: 'cli', label: 'CLI Downloads', icon: ComputerTerminal01Icon },
] as const;

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export default function StudioComponentsPage() {
  const user = useStudioUser();
  const [items, setItems] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [tab, setTab] = useState<Tab>('published');
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

  const published = items.filter((c) => c.isPublished);
  const drafts = items.filter((c) => !c.isPublished);

  // No tenemos estado "review" en el modelo — la pestaña queda en cero, igual que la maqueta.
  const tabCounts: Record<Tab, number> = {
    published: published.length,
    review: 0,
    draft: drafts.length,
  };

  const visible = useMemo(() => {
    const rows = tab === 'published' ? published : tab === 'draft' ? drafts : [];
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((c) =>
      `${c.name} ${c.title} ${c.description ?? ''} ${c.tags.join(' ')}`
        .toLowerCase()
        .includes(q),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, tab, query]);

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

  const tabs: { key: Tab; label: string }[] = [
    { key: 'published', label: 'Published' },
    { key: 'review', label: 'Review' },
    { key: 'draft', label: 'Draft' },
  ];

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
      {/* Resumen rápido */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {[
          { n: published.length, label: 'publicados' },
          { n: drafts.length, label: 'borradores' },
          { n: 0, label: 'views' },
          { n: 0, label: 'bookmarks' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{s.n}</span>
            {s.label}
          </div>
        ))}
      </div>

      {/* Tarjetas de analítica */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className="overflow-hidden rounded-[10px] border border-border/60">
            <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
              <HugeiconsIcon icon={card.icon} size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{card.label}</span>
              <span className="ml-auto text-xs font-medium text-foreground">0</span>
            </div>
            <div className="px-2 py-2">
              <div className="flex h-[120px] items-center justify-center">
                <span className="text-xs text-muted-foreground">Sin datos</span>
              </div>
            </div>
          </div>
        ))}

        {/* Support clicks — bloqueado hasta cargar un link de donación */}
        <div className="relative overflow-hidden rounded-[10px] border border-border/60">
          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
            <HugeiconsIcon icon={FavouriteIcon} size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Support clicks</span>
            <span className="ml-auto text-xs font-medium text-foreground">—</span>
          </div>
          <div className="px-2 py-2">
            <div className="h-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-[10px] bg-background/60 backdrop-blur-[2px]">
            <HugeiconsIcon
              icon={SquareLock01Icon}
              size={16}
              className="text-muted-foreground"
            />
            <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
              Agregá un link de donación para medir el apoyo
            </p>
            <a
              href={`/studio/${user.username}/profile#donation`}
              className="inline-flex h-7 items-center rounded-md bg-foreground px-3 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Agregar link
            </a>
          </div>
        </div>
      </div>

      {/* Tabs + búsqueda + crear */}
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="flex items-center gap-1.5 rounded-md bg-muted p-1">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors',
                  'outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active
                    ? 'bg-card text-foreground shadow-[0_1px_2px_oklch(0.21_0.012_264_/_0.06)]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t.label}
                <span className={active ? 'text-foreground' : 'text-muted-foreground/70'}>
                  {tabCounts[t.key]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <HugeiconsIcon
              icon={Search01Icon}
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="h-7 w-full rounded-md border border-border/60 bg-card pl-8 pr-3 text-xs text-foreground caret-ring outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            />
          </div>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground outline-none transition-[background-color,transform] duration-150 hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} strokeWidth={2} />
            Create New
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="h-11 px-3 font-medium text-muted-foreground">Componente</th>
                <th className="h-11 w-[110px] px-3 font-medium text-muted-foreground">Tipo</th>
                <th className="h-11 w-[110px] px-3 font-medium text-muted-foreground">Estado</th>
                <th className="h-11 w-[150px] px-3 font-medium text-muted-foreground">Creado</th>
                <th className="h-11 w-[80px] px-3 text-right font-medium text-muted-foreground">
                  Archivos
                </th>
                <th className="h-11 w-[120px] px-3 pr-4" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                    Cargando…
                  </td>
                </tr>
              ) : loadError ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                      <HugeiconsIcon icon={AlertCircleIcon} size={18} />
                      No se pudo cargar el registry.
                      <button
                        type="button"
                        onClick={load}
                        className="text-xs font-medium text-foreground underline underline-offset-4"
                      >
                        Reintentar
                      </button>
                    </div>
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                    {query.trim()
                      ? 'Nada coincide con la búsqueda.'
                      : tab === 'review'
                        ? 'Nada en revisión.'
                        : tab === 'draft'
                          ? 'No tenés borradores.'
                          : 'Todavía no publicaste componentes.'}
                  </td>
                </tr>
              ) : (
                visible.map((c) => (
                  <tr
                    key={c.id}
                    className="group border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => setViewingId(c.id)}
                        className="flex items-center gap-3 text-left outline-none"
                      >
                        <span className="grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-border/60 bg-muted">
                          {c.preview ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={c.preview}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={PackageIcon}
                              size={15}
                              className="text-muted-foreground"
                            />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground group-hover:underline">
                            {c.title}
                          </span>
                          <span className="block truncate font-mono text-xs text-muted-foreground">
                            {c.name}
                          </span>
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">
                      {c.type.replace('registry:', '')}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 text-xs',
                          c.isPublished ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            c.isPublished ? 'bg-accent' : 'bg-muted-foreground/50',
                          )}
                        />
                        {c.isPublished ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">
                      {fmtDate(c.createdAt)}
                    </td>
                    <td className="px-3 py-2.5 text-right text-xs text-muted-foreground">
                      {c.files.length}
                    </td>
                    <td className="px-3 py-2.5 pr-4">
                      <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                        <button
                          type="button"
                          onClick={() => copyCmd(c)}
                          aria-label="Copiar comando de instalación"
                          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <HugeiconsIcon
                            icon={copiedId === c.id ? Tick02Icon : Copy01Icon}
                            size={14}
                            className={copiedId === c.id ? 'text-accent' : undefined}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(c)}
                          aria-label={`Editar ${c.title}`}
                          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setToDelete(c)}
                          aria-label={`Borrar ${c.title}`}
                          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
        description={toDelete ? `"${toDelete.title}" se va a eliminar del registry.` : undefined}
        confirmLabel="Borrar"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
