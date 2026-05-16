import * as React from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: IconSvgElement;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
      {icon && (
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-muted text-muted-foreground">
          <HugeiconsIcon icon={icon} size={20} />
        </span>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
