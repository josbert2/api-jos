'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { apiDelete, apiPatch, apiPost } from '@/lib/api';
import { ResourceCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const CATEGORY_COLORS = [
  'oklch(0.62 0.14 215)',
  'oklch(0.62 0.14 155)',
  'oklch(0.63 0.17 25)',
  'oklch(0.72 0.14 70)',
  'oklch(0.55 0.16 290)',
  'oklch(0.55 0.03 264)',
];

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
  'cat';

function ColorPicker({ value, onChange }: { value: string | null; onChange: (c: string) => void }) {
  return (
    <div className="flex gap-1.5">
      {CATEGORY_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-label="Color"
          className={cn(
            'h-5 w-5 rounded-full outline-none ring-offset-2 ring-offset-card transition',
            'focus-visible:ring-2 focus-visible:ring-ring',
            value === c && 'ring-2 ring-foreground',
          )}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

export function CategoriesDialog({
  open,
  onOpenChange,
  categories,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ResourceCategory[];
  onChanged: () => void;
}) {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(CATEGORY_COLORS[0]);
  const [busy, setBusy] = useState(false);

  async function add() {
    const name = newName.trim();
    if (!name || busy) return;
    setBusy(true);
    try {
      await apiPost('/resources/categories', {
        name,
        slug: `${slugify(name)}-${Date.now().toString(36)}`,
        color: newColor,
        order: categories.length,
      });
      setNewName('');
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function rename(c: ResourceCategory, name: string) {
    const v = name.trim();
    if (v && v !== c.name) {
      await apiPatch(`/resources/categories/${c.id}`, { name: v });
      onChanged();
    }
  }

  async function recolor(c: ResourceCategory, color: string) {
    await apiPatch(`/resources/categories/${c.id}`, { color });
    onChanged();
  }

  async function remove(c: ResourceCategory) {
    await apiDelete(`/resources/categories/${c.id}`);
    onChanged();
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <Dialog.Content
          style={{ boxShadow: '0 8px 28px -8px oklch(0.21 0.012 264 / 0.18)' }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-card p-6 focus:outline-none"
        >
          <Dialog.Title className="text-base font-semibold text-foreground">Categorías</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Organizá tu bóveda. Borrar una categoría no borra sus recursos.
          </Dialog.Description>

          <div className="mt-4 space-y-2">
            {categories.length === 0 && (
              <p className="text-sm text-muted-foreground">Todavía no hay categorías.</p>
            )}
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <input
                  defaultValue={c.name}
                  onBlur={(e) => rename(c, e.target.value)}
                  className="h-9 min-w-0 flex-1 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                />
                <ColorPicker value={c.color} onChange={(col) => recolor(c, col)} />
                <button
                  type="button"
                  onClick={() => remove(c)}
                  aria-label={`Borrar ${c.name}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={16} className="text-destructive" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
              Nueva categoría
            </p>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  add();
                }
              }}
              placeholder="Nombre de la categoría"
            />
            <div className="mt-3 flex items-center justify-between">
              <ColorPicker value={newColor} onChange={setNewColor} />
              <Button size="sm" onClick={add} loading={busy} disabled={!newName.trim()}>
                <HugeiconsIcon icon={PlusSignIcon} size={15} strokeWidth={2} />
                Agregar
              </Button>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Dialog.Close asChild>
              <Button variant="outline" size="sm">
                Cerrar
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
