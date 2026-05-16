'use client';

import { FormEvent, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Delete02Icon,
  PencilEdit02Icon,
  PlusSignIcon,
  SourceCodeIcon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';
import { Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

type Draft = Partial<Skill>;

const empty: Draft = { name: '', category: '', level: 80, icon: '', order: 0, isPublished: true };

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      setItems(await apiGet<Skill[]>('/skills/admin/all'));
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
      const { id, createdAt, updatedAt, ...payload } = editing as Skill;
      if (editing.id) await apiPatch(`/skills/${editing.id}`, payload);
      else await apiPost('/skills', payload);
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
      await apiDelete(`/skills/${toDelete.id}`);
      setToDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader title="Skills" description="Tecnologías y herramientas del portfolio.">
        <Button onClick={() => setEditing({ ...empty })}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={2} />
          Nueva
        </Button>
      </PageHeader>

      {editing && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <p className="mb-4 text-sm font-medium text-foreground">
              {editing.id ? 'Editar skill' : 'Nueva skill'}
            </p>
            <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-3">
              <Field label="Nombre">
                <Input
                  value={editing.name ?? ''}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  required
                />
              </Field>
              <Field label="Categoría">
                <Input
                  value={editing.category ?? ''}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                />
              </Field>
              <Field label="Nivel (0-100)">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={editing.level ?? 0}
                  onChange={(e) => setEditing({ ...editing, level: Number(e.target.value) })}
                />
              </Field>
              <Field label="Icon (url o nombre)" className="sm:col-span-2">
                <Input
                  value={editing.icon ?? ''}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                />
              </Field>
              <Field label="Orden">
                <Input
                  type="number"
                  value={editing.order ?? 0}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </Field>
              <Checkbox
                label="Publicado"
                className="sm:col-span-3"
                checked={!!editing.isPublished}
                onChange={(e) => setEditing({ ...editing, isPublished: e.target.checked })}
              />
              {error && <p className="text-sm text-destructive sm:col-span-3">{error}</p>}
              <div className="flex gap-2 sm:col-span-3">
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
          description="Hubo un problema al traer las skills."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={SourceCodeIcon}
          title="Sin skills cargadas"
          description="Agregá la primera o importalas de josbert.dev."
        />
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead className="text-right">Orden</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="text-muted-foreground">{s.category ?? '—'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.min(100, Math.max(0, s.level))}%` }}
                      />
                    </div>
                    <span className="tabular-nums text-xs text-muted-foreground">{s.level}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {s.order}
                </TableCell>
                <TableCell>
                  <Badge variant={s.isPublished ? 'success' : 'muted'}>
                    {s.isPublished ? 'Publicado' : 'Borrador'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Editar ${s.name}`}
                      onClick={() => setEditing(s)}
                    >
                      <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Borrar ${s.name}`}
                      onClick={() => setToDelete(s)}
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
        title="Borrar skill"
        description={
          toDelete
            ? `"${toDelete.name}" se va a eliminar. Esta acción no se puede deshacer.`
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
