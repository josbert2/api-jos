import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-[88px] w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground',
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
));
Textarea.displayName = 'Textarea';
