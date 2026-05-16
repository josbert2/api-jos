'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  ComputerTerminal01Icon,
  Loading03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';
import { apiPost, setToken } from '@/lib/api';
import { AuthUser } from '@/lib/types';
import { cn } from '@/lib/utils';

// Login en tema light, consume los tokens de globals.css (ver DESIGN.md).
const fieldClass = cn(
  'h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground',
  'caret-ring outline-none transition-[border-color,box-shadow] duration-150',
  'hover:border-foreground/25',
  'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'aria-[invalid=true]:border-destructive',
);

const labelClass =
  'mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.09em] text-muted-foreground';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost<{ token: string; user: AuthUser }>('/auth/login', {
        email,
        password,
      });
      setToken(res.token);
      router.push('/projects');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setError(
        msg === 'Unauthorized'
          ? 'Email o contraseña incorrectos.'
          : 'No se pudo iniciar sesión. Revisá la conexión e intentá de nuevo.',
      );
      setLoading(false);
    }
  }

  // El error es de credenciales, no de un campo: se limpia apenas el usuario reescribe.
  const clearError = () => error && setError(null);
  const invalid = error ? true : undefined;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.21 0.012 264 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(0.21 0.012 264 / 0.05) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
            maskImage:
              'radial-gradient(ellipse 64% 52% at 50% 42%, transparent 26%, #000 86%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 64% 52% at 50% 42%, transparent 26%, #000 86%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 45% 40% at 50% 38%, oklch(0.55 0.13 215 / 0.05), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[22rem]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <HugeiconsIcon
              icon={ComputerTerminal01Icon}
              size={18}
              strokeWidth={2}
              className="text-accent"
            />
          </span>
          <span className="font-mono text-[0.8rem] tracking-tight text-foreground">
            josbert.dev<span className="text-muted-foreground">/admin</span>
          </span>
        </div>

        <h1 className="mt-9 text-[1.4rem] font-semibold tracking-[-0.015em] text-foreground">
          Iniciá sesión
        </h1>

        <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              aria-invalid={invalid}
              aria-describedby={error ? 'login-error' : undefined}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                aria-invalid={invalid}
                aria-describedby={error ? 'login-error' : undefined}
                className={cn(fieldClass, 'pr-11')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={showPassword}
                className={cn(
                  'absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center',
                  'rounded-md text-muted-foreground outline-none transition-colors',
                  'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                <HugeiconsIcon icon={showPassword ? ViewOffSlashIcon : ViewIcon} size={18} />
              </button>
            </div>
          </div>

          {error && (
            <p
              id="login-error"
              role="alert"
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2.5 text-[0.8rem]',
                'border border-destructive/25 bg-destructive/[0.07] text-destructive',
              )}
            >
              <HugeiconsIcon icon={AlertCircleIcon} size={16} strokeWidth={2} className="shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'group mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg',
              'bg-primary text-sm font-medium text-primary-foreground',
              'outline-none transition-[background-color,transform] duration-150',
              'hover:bg-primary/90 active:scale-[0.99]',
              'focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'disabled:cursor-not-allowed disabled:opacity-60',
              'motion-reduce:transition-none motion-reduce:active:scale-100',
            )}
          >
            {loading ? (
              <>
                <HugeiconsIcon icon={Loading03Icon} size={17} className="animate-spin" />
                Entrando…
              </>
            ) : (
              <>
                Entrar
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </>
            )}
          </button>
        </form>
      </div>

      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: oklch(var(--foreground));
          -webkit-box-shadow: 0 0 0 100px oklch(var(--card)) inset;
          caret-color: oklch(var(--ring));
          transition: background-color 100000s ease 0s;
        }
      `}</style>
    </main>
  );
}
