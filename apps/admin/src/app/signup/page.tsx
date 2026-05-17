'use client';

import { FormEvent, useMemo, useState } from 'react';
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

// Mismo slugify que el backend (auth.service.ts) — solo para el preview de la URL.
function slugifyUsername(raw: string) {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

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

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slug = useMemo(() => slugifyUsername(username), [username]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (slug.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres válidos (letras o números).');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost<{ token: string; user: AuthUser }>('/auth/register', {
        name: name.trim() || undefined,
        username,
        email,
        password,
      });
      setToken(res.token);
      router.push(`/studio/${res.user.username}`);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'No se pudo crear la cuenta. Intentá de nuevo.',
      );
      setLoading(false);
    }
  }

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
          Creá tu cuenta
        </h1>
        <p className="mt-1.5 text-[0.8rem] text-muted-foreground">
          Vas a tener tu propio Studio para publicar componentes.
        </p>

        <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre <span className="lowercase tracking-normal">(opcional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError();
              }}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="username" className={labelClass}>
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearError();
              }}
              aria-invalid={invalid}
              aria-describedby={error ? 'signup-error' : 'username-hint'}
              className={fieldClass}
            />
            <p id="username-hint" className="mt-1.5 font-mono text-[0.72rem] text-muted-foreground">
              /studio/<span className="text-foreground">{slug || '…'}</span>
            </p>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              aria-invalid={invalid}
              aria-describedby={error ? 'signup-error' : undefined}
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
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                aria-invalid={invalid}
                aria-describedby={error ? 'signup-error' : undefined}
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
              id="signup-error"
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
                Creando…
              </>
            ) : (
              <>
                Crear cuenta
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

        <p className="mt-6 text-center text-[0.8rem] text-muted-foreground">
          ¿Ya tenés cuenta?{' '}
          <a
            href="/login"
            className={cn(
              'rounded-sm font-medium text-foreground underline-offset-4 hover:underline',
              'outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          >
            Iniciá sesión
          </a>
        </p>
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
