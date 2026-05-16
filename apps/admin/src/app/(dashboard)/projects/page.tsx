'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Delete02Icon,
  GridViewIcon,
  PencilEdit02Icon,
  PlusSignIcon,
  StarIcon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet } from '@/lib/api';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      setItems(await apiGet<Project[]>('/projects/admin/all'));
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiDelete(`/projects/${toDelete.id}`);
      setToDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader title="Proyectos" description="Trabajos del portfolio público.">
        <Button asChild>
          <Link href="/projects/new">
            <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
            Nuevo
          </Link>
        </Button>
      </PageHeader>

      {loading ? (
        <TableSkeleton />
      ) : loadError ? (
        <EmptyState
          icon={AlertCircleIcon}
          title="No se pudo cargar"
          description="Hubo un problema al traer los proyectos."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={GridViewIcon}
          title="No hay proyectos todavía"
          description="Creá el primero o importá los de josbert.dev."
          action={
            <Button asChild>
              <Link href="/projects/new">
                <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
                Nuevo proyecto
              </Link>
            </Button>
          }
        />
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Título</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Orden</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    {p.isBest && (
                      <HugeiconsIcon
                        icon={StarIcon}
                        size={14}
                        className="shrink-0 text-accent"
                        aria-label="Destacado"
                      />
                    )}
                    {p.title}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{p.slug}</TableCell>
                <TableCell className="text-muted-foreground">{p.date ?? '—'}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {p.order}
                </TableCell>
                <TableCell>
                  <Badge variant={p.isPublished ? 'success' : 'muted'}>
                    {p.isPublished ? 'Publicado' : 'Borrador'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" asChild aria-label={`Editar ${p.title}`}>
                      <Link href={`/projects/${p.id}`}>
                        <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Borrar ${p.title}`}
                      onClick={() => setToDelete(p)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} className="text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Borrar proyecto"
        description={
          toDelete
            ? `"${toDelete.title}" se va a eliminar. Esta acción no se puede deshacer.`
            : undefined
        }
        confirmLabel="Borrar"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
