'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Copy01Icon,
  LinkSquare02Icon,
  PencilEdit02Icon,
  RefreshIcon,
  SourceCodeIcon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import dynamic from 'next/dynamic';
import { Component } from '@/lib/types';
import { cn } from '@/lib/utils';

const SandpackPreviewPane = dynamic(
  () => import('./sandpack-preview').then((m) => m.SandpackPreviewPane),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center bg-muted text-sm text-muted-foreground">
        Cargando preview…
      </div>
    ),
  },
);

const REGISTRY_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/r';

const iconBtn =
  'inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground outline-none ' +
  'transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring';

const basename = (p: string) => p.split('/').pop() || p;

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
  const [showCode, setShowCode] = useState(false);
  const [activeFile, setActiveFile] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    if (open) {
      setActiveFile(0);
      setShowCode(false);
    } else {
      setCopied(false);
    }
  }, [open]);

  if (!component) return null;
  const c = component;
  const command = `npx shadcn@latest add ${REGISTRY_BASE}/${c.author}/${c.name}`;
  const file = c.files[activeFile] ?? c.files[0];

  function copyCmd() {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'flex flex-col overflow-hidden',
            'w-[90vw] h-[90vh] max-w-[1200px]',
            'rounded-xl border border-border bg-card',
            'shadow-2xl focus:outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'transition-all duration-200',
          )}
        >
          {/* ── Top bar ── */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-border px-2">
            {/* Left: meta */}
            <div className="flex min-w-0 items-center gap-2">
              <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {c.author}/{c.name}
              </code>
              <Dialog.Title className="truncate text-sm font-medium text-foreground">
                {c.title}
              </Dialog.Title>
              <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {c.type.replace('registry:', '')}
              </span>
              {!c.isPublished && (
                <span className="shrink-0 rounded-md bg-warning/15 px-1.5 py-0.5 text-xs text-warning">
                  borrador
                </span>
              )}
            </div>

            {/* Right: actions */}
            <div className="flex shrink-0 items-center gap-0.5 pl-3">
              <button
                type="button"
                onClick={() => setPreviewKey((k) => k + 1)}
                aria-label="Recargar preview"
                className={iconBtn}
              >
                <HugeiconsIcon icon={RefreshIcon} size={14} />
              </button>
              <button
                type="button"
                onClick={() => setShowCode((v) => !v)}
                aria-label="Ver código"
                className={cn(iconBtn, showCode && 'bg-muted text-foreground')}
              >
                <HugeiconsIcon icon={SourceCodeIcon} size={14} />
              </button>
              <button
                type="button"
                onClick={copyCmd}
                aria-label="Copiar comando de instalación"
                className={iconBtn}
              >
                <HugeiconsIcon
                  icon={copied ? Tick02Icon : Copy01Icon}
                  size={14}
                  className={copied ? 'text-accent' : ''}
                />
              </button>
              <Link
                href={`/${c.author}/${c.name}`}
                target="_blank"
                aria-label="Abrir página del componente"
                className={cn(iconBtn, 'inline-flex h-6 items-center gap-1 px-2 w-auto text-xs font-medium')}
              >
                Open
                <HugeiconsIcon icon={LinkSquare02Icon} size={12} />
              </Link>
              <button
                type="button"
                onClick={() => onEdit(c)}
                aria-label="Editar"
                className={iconBtn}
              >
                <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
              </button>
              <Dialog.Close aria-label="Cerrar" className={iconBtn}>
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </Dialog.Close>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
            {/* Preview — full height */}
            <div className="flex-1 overflow-hidden">
              <SandpackPreviewPane
                key={previewKey}
                component={c}
                style={{ height: '100%' }}
              />
            </div>

            {/* Code panel — slides in from right */}
            {showCode && file && (
              <div className="flex w-[420px] shrink-0 flex-col border-l border-border">
                {/* File tabs */}
                <div className="flex shrink-0 items-center gap-0.5 overflow-x-auto border-b border-border px-2 py-1">
                  {c.files.map((f, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveFile(i)}
                      className={cn(
                        'shrink-0 rounded px-2 py-1 font-mono text-xs outline-none transition-colors',
                        'focus-visible:ring-2 focus-visible:ring-ring',
                        i === activeFile
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {basename(f.path)}
                    </button>
                  ))}
                </div>
                <p className="shrink-0 px-3 py-1 font-mono text-[0.65rem] text-muted-foreground/60">
                  {file.path}
                </p>
                <pre className="flex-1 overflow-auto p-3 text-xs leading-relaxed">
                  <code className="font-mono text-foreground/80">{file.content}</code>
                </pre>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
