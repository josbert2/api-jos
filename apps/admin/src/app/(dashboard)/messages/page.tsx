'use client';

import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Archive02Icon,
  Delete02Icon,
  InboxIcon,
  Mail01Icon,
  MailOpen01Icon,
} from '@hugeicons/core-free-icons';
import { apiDelete, apiGet, apiPatch } from '@/lib/api';
import { ContactMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { cn } from '@/lib/utils';

export default function MessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError(false);
    try {
      setItems(await apiGet<ContactMessage[]>('/contact'));
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: number, status: ContactMessage['status']) {
    await apiPatch(`/contact/${id}/status`, { status });
    await load();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function openMessage(m: ContactMessage) {
    setSelected(m);
    if (m.status === 'new') await setStatus(m.id, 'read');
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await apiDelete(`/contact/${toDelete.id}`);
      if (selected?.id === toDelete.id) setSelected(null);
      setToDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader title="Mensajes" description="Bandeja de contacto del sitio." />

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      ) : loadError ? (
        <EmptyState
          icon={AlertCircleIcon}
          title="No se pudo cargar"
          description="Hubo un problema al traer los mensajes."
          action={
            <Button variant="outline" onClick={load}>
              Reintentar
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={InboxIcon}
          title="Sin mensajes"
          description="Cuando alguien escriba desde el formulario de contacto, aparece acá."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="overflow-hidden rounded-xl border border-border">
            {items.map((m) => {
              const active = selected?.id === m.id;
              const unread = m.status === 'new';
              return (
                <button
                  key={m.id}
                  onClick={() => openMessage(m)}
                  className={cn(
                    'flex w-full flex-col gap-1 border-b border-border px-4 py-3 text-left outline-none transition-colors last:border-0',
                    'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    active ? 'bg-muted' : 'hover:bg-muted/50',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={unread ? Mail01Icon : MailOpen01Icon}
                      size={15}
                      className={cn('shrink-0', unread ? 'text-accent' : 'text-muted-foreground')}
                    />
                    <span
                      className={cn(
                        'flex-1 truncate text-sm text-foreground',
                        unread && 'font-semibold',
                      )}
                    >
                      {m.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="truncate pl-[23px] text-xs text-muted-foreground">
                    {m.subject ?? m.message.slice(0, 64)}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border p-6">
            {selected ? (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">
                        {selected.subject ?? '(sin asunto)'}
                      </h2>
                      {selected.status === 'archived' && <Badge>Archivado</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selected.name} · {selected.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStatus(selected.id, 'archived')}
                      disabled={selected.status === 'archived'}
                    >
                      <HugeiconsIcon icon={Archive02Icon} size={15} />
                      Archivar
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Borrar mensaje"
                      onClick={() => setToDelete(selected)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} className="text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm leading-relaxed text-foreground">
                  {selected.message}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
                <HugeiconsIcon icon={MailOpen01Icon} size={26} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Seleccioná un mensaje para leerlo.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Borrar mensaje"
        description={
          toDelete
            ? `El mensaje de ${toDelete.name} se va a eliminar. Esta acción no se puede deshacer.`
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
