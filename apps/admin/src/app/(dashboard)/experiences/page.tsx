'use client';

import { FormEvent, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Briefcase01Icon,
  Delete02Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';
import { Experience } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, Checkbox } from '@/components/ui/field';
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

type Draft = Partial<Experience>;

const empty: Draft = {
  company: '',
  role: '',
  location: '',
  description: '',
  startDate: '',
  endDate: '',
  current: false,
  order: 0,
  isPublished: true,
};

export default function ExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      setItems(await apiGet<Experience[]>('/experiences/admin/all'));
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const { id, createdAt, updatedAt, ...rest } = editing as Experience;
      const payload = { ...rest, endDate: editing.endDate || undefined };
      if (editing.id) await apiPatch(`/experiences/${editing.id}`, payload);
      else await apiPost('/experiences', payload);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiDelete(`/experiences/${toDelete.id}`);
      setToDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader title="Experiencia" description="Trayectoria laboral del portfolio.">
        <Button onClick={() => setEditing({ ...empty })}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
          Nueva
        </Button>
      </PageHeader>

      {editing && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <p className="mb-4 text-sm font-medium text-foreground">
              {editing.id ? 'Editar experiencia' : 'Nueva experiencia'}
            </p>
            <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-2">
              <Field label="Empresa">
                <Input
                  value={editing.company ?? ''}
                  onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                  required
                />
              </Field>
              <Field label="Rol">
                <Input
                  value={editing.role ?? ''}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  required
                />
              </Field>
              <Field label="Ubicación">
                <Input
                  value={editing.location ?? ''}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                />
              </Field>
              <Field label="Orden">
                <Input
                  type="number"
                  value={editing.order ?? 0}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </Field>
              <Field label="Desde">
                <Input
                  type="date"
                  value={editing.startDate ?? ''}
                  onChange={(e) => setEditing({ ...editing, startDate: e.target.value })}
                  required
                />
              </Field>
              <Field label="Hasta">
                <Input
                  type="date"
                  value={editing.endDate ?? ''}
                  onChange={(e) => setEditing({ ...editing, endDate: e.target.value })}
                  disabled={editing.current}
                />
              </Field>
              <Field label="Descripción" className="sm:col-span-2">
                <Textarea
                  rows={4}
                  value={editing.description ?? ''}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Field>
              <div className="flex gap-6 sm:col-span-2">
                <Checkbox
                  label="Actual"
                  checked={!!editing.current}
                  onChange={(e) => setEditing({ ...editing, current: e.target.checked })}
                />
                <Checkbox
                  label="Publicado"
                  checked={!!editing.isPublished}
                  onChange={(e) => setEditing({ ...editing, isPublished: e.target.checked })}
                />
              </div>
              {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" loading={saving}>
                  Guardar
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <TableSkeleton />
      ) : loadError ? (
        <EmptyState
          icon={AlertCircleIcon}
          title="No se pudo cargar"
          description="Hubo un problema al traer la experiencia."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Briefcase01Icon}
          title="Sin experiencia cargada"
          description="Agregá tu primer puesto o importalo del CV."
        />
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Empresa</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((x) => (
              <TableRow key={x.id}>
                <TableCell className="font-medium">{x.company}</TableCell>
                <TableCell>{x.role}</TableCell>
                <TableCell className="text-muted-foreground">
                  {x.startDate} – {x.current ? 'Actual' : (x.endDate ?? '—')}
                </TableCell>
                <TableCell>
                  <Badge variant={x.isPublished ? 'success' : 'muted'}>
                    {x.isPublished ? 'Publicado' : 'Borrador'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Editar ${x.company}`}
                      onClick={() => setEditing(x)}
                    >
                      <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Borrar ${x.company}`}
                      onClick={() => setToDelete(x)}
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
        title="Borrar experiencia"
        description={
          toDelete
            ? `"${toDelete.role} · ${toDelete.company}" se va a eliminar. Esta acción no se puede deshacer.`
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
