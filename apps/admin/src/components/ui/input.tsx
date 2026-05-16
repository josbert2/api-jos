import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground',
        'caret-ring transition-[border-color,box-shadow] duration-150',
        'placeholder:text-muted-foreground/70',
        'outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'aria-[invalid=true]:border-destructive',
        'disabled:cursor-not-allowed disabled:opacity-55',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
