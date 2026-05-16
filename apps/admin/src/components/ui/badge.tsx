import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Texto en tono oscuro de cada color semantico para asegurar contraste sobre el tinte claro.
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        muted: 'bg-muted text-muted-foreground',
        accent: 'bg-accent/15 text-[oklch(0.5_0.13_215)]',
        success: 'bg-success/18 text-[oklch(0.43_0.12_155)]',
        warning: 'bg-warning/25 text-[oklch(0.46_0.11_70)]',
        danger: 'bg-destructive/14 text-[oklch(0.48_0.18_25)]',
      },
    },
    defaultVariants: { variant: 'muted' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
