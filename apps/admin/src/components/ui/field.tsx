import * as React from 'react';
import { cn } from '@/lib/utils';

// Campo de formulario: el <label> envuelve al control, asociacion implicita.
export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function Checkbox({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2 text-sm text-foreground', className)}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-input accent-[oklch(0.55_0.13_215)]"
        {...props}
      />
      {label}
    </label>
  );
}
