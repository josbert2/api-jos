'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Copy01Icon,
  PackageIcon,
  PencilEdit02Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { Component } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const REGISTRY_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/api/r';

const toolBtn =
  'grid h-8 w-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors ' +
  'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring';

export function ComponentDetailModal({
  component,
  open,
  onOpenChange,
  onEdit,
}: {
  component: Component | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (c: Component) => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  if (!component) return null;
  const c = component;
  const command = `npx shadcn@latest add ${REGISTRY_BASE}/${c.name}`;

  function copyCmd() {
    navigator.clipboard?.writeText(command).then(() => {
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
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <HugeiconsIcon icon={PackageIcon} size={16} className="shrink-0 text-muted-foreground" />
            <Dialog.Title className="line-clamp-1 flex-1 text-sm font-medium text-foreground">
              {c.title}
            </Dialog.Title>
            <button type="button" onClick={() => onEdit(c)} aria-label="Editar" className={toolBtn}>
              <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
            </button>
            <Dialog.Close aria-label="Cerrar" className={toolBtn}>
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto p-5">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {c.name}
              </code>
              <Badge variant="accent">{c.type.replace('registry:', '')}</Badge>
              {!c.isPublished && <Badge variant="warning">Borrador</Badge>}
            </div>
            {c.description && (
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
            )}

            {/* Comando de instalación */}
            <p className="mb-1.5 mt-4 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
              Instalar
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 py-2 pl-3 pr-2">
              <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-foreground">
                {command}
              </code>
              <Button size="sm" variant="outline" onClick={copyCmd} className="shrink-0">
                <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={14} />
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>

            {/* Dependencias */}
            {(c.dependencies.length > 0 || c.registryDependencies.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {c.dependencies.map((d) => (
                  <span
                    key={d}
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
                {c.registryDependencies.map((d) => (
                  <span
                    key={d}
                    className="rounded bg-accent/12 px-1.5 py-0.5 font-mono text-[0.65rem] text-[oklch(0.5_0.13_215)]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}

            {/* Archivos */}
            <p className="mb-1.5 mt-4 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
              {c.files.length === 1 ? 'Archivo' : `${c.files.length} archivos`}
            </p>
            <div className="space-y-3">
              {c.files.map((f, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-border">
                  <div className="border-b border-border bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                    {f.path}
                  </div>
                  <pre className="max-h-72 overflow-auto bg-card p-3 text-xs leading-relaxed">
                    <code className="font-mono text-foreground">{f.content}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
