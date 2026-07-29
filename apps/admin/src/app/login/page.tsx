'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Loading03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';
import { apiPost, setToken } from '@/lib/api';
import { AuthUser } from '@/lib/types';
import { cn } from '@/lib/utils';

const BG   = 'rgb(38,38,38)';
const BLUE = 'rgb(45,104,255)';

export default function LoginPage() {
  const router = useRouter();
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPwd,     setShowPwd]     = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);

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
      router.push(res.user.role === 'admin' ? '/projects' : `/studio/${res.user.username}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setError(
        msg === 'Unauthorized'
          ? 'Email o contraseña incorrectos.'
          : 'No se pudo iniciar sesión. Revisá la conexión.',
      );
      setLoading(false);
    }
  }

  const clearError = () => error && setError(null);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background: `${BG} url('https://ui8.net/img/login.jpg') no-repeat center center / cover`,
      }}
    >
      {/* overlay oscuro para legibilidad del form */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.35)' }}
      />

      {/* ── form container ── */}
      <div className="relative z-10 w-[340px]">

        {/* logo */}
        <div className="mb-6 flex justify-center">
          <svg viewBox="0 0 1103 386" height="38" aria-label="josbert.dev">
            <path fill="#FFF312" d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z"/>
          </svg>
        </div>

        {/* título */}
        <h1
          className="mb-8 text-center"
          style={{ fontSize: '28px', fontWeight: 450, lineHeight: '40px', letterSpacing: '-0.28px', color: 'rgba(255,255,255,0.88)' }}
        >
          Iniciá sesión
        </h1>

        {/* form */}
        <form onSubmit={onSubmit}>

          {/* campo email */}
          <Field
            label="Email"
            placeholder="designer@example.com"
            type="email"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(v) => { setEmail(v); clearError(); }}
            invalid={!!error}
          />

          {/* campo password */}
          <Field
            label="Contraseña"
            placeholder="contraseña"
            type={showPwd ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(v) => { setPassword(v); clearError(); }}
            invalid={!!error}
            extra={
              <a
                href="#"
                className="text-white transition-opacity hover:opacity-70"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '-14px',
                  zIndex: 4,
                  padding: '0 4px',
                  background: BG,
                  fontSize: '13px',
                  fontWeight: 450,
                  letterSpacing: '-0.28px',
                  lineHeight: '24px',
                }}
                tabIndex={-1}
              >
                ¿Olvidaste tu contraseña?
              </a>
            }
            action={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPwd((v) => !v)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <HugeiconsIcon icon={showPwd ? ViewOffSlashIcon : ViewIcon} size={22} />
              </button>
            }
          />

          {/* error */}
          {error && (
            <p
              role="alert"
              className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[0.8rem]"
              style={{
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                color: 'rgb(248,113,113)',
              }}
            >
              <HugeiconsIcon icon={AlertCircleIcon} size={16} strokeWidth={2} className="shrink-0" />
              {error}
            </p>
          )}

          {/* botón principal */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              height: '56px',
              background: BLUE,
              border: `2px solid ${BLUE}`,
              borderRadius: '8px',
              color: '#fff',
              fontSize: '17px',
              fontWeight: 500,
              letterSpacing: '-0.28px',
              cursor: 'pointer',
            }}
          >
            {loading
              ? <><HugeiconsIcon icon={Loading03Icon} size={18} className="animate-spin" />Entrando…</>
              : 'Entrar'}
          </button>
        </form>

        {/* hint */}
        <div
          className="mt-8 text-center"
          style={{ fontSize: '13px', fontWeight: 450, letterSpacing: '-0.28px', color: 'rgba(255,255,255,0.75)' }}
        >
          ¿No tenés cuenta?{' '}
          <a href="/signup" className="text-white underline-offset-4 hover:underline">
            Creá una
          </a>
        </div>
      </div>

      {/* copyright */}
      <div
        className="absolute bottom-8 w-full text-center"
        style={{ fontSize: '12px', fontWeight: 450, letterSpacing: '-0.28px', color: 'rgba(255,255,255,0.5)' }}
      >
        © {new Date().getFullYear()} josbert.dev
      </div>

      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0 100px rgb(38,38,38) inset;
          caret-color: rgb(45,104,255);
          transition: background-color 100000s ease 0s;
        }
      `}</style>
    </main>
  );
}

/* ────────────────────────────────────────────────
   Field — label estático cortando el borde,
   igual al div.field__label de ui8
──────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  extra?: React.ReactNode;
  action?: React.ReactNode;
}

import type React from 'react';

function Field({
  label, placeholder, type = 'text',
  autoComplete, autoFocus, required,
  value, onChange, invalid, extra, action,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = invalid
    ? 'rgba(239,68,68,0.7)'
    : focused
      ? 'rgb(45,104,255)'
      : 'rgb(77,77,77)';

  return (
    <div style={{ position: 'relative', height: '56px', marginBottom: '24px' }}>
      {/* label estático cortando el borde superior */}
      <div
        style={{
          position: 'absolute',
          top: '-9px',
          left: '12px',
          zIndex: 4,
          padding: '0 4px',
          background: 'rgb(38,38,38)',
          color: invalid ? 'rgba(248,113,113,0.85)' : 'rgba(255,255,255,0.75)',
          fontSize: '13px',
          fontWeight: 450,
          lineHeight: '14px',
          letterSpacing: '-0.28px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>

      {/* extra (ej: "Forgot password?") */}
      {extra}

      {/* input */}
      <input
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={invalid || undefined}
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '56px',
          padding: '0 14px',
          paddingRight: action ? '48px' : '14px',
          background: 'rgb(38,38,38)',
          border: `2px solid ${borderColor}`,
          borderRadius: '8px',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 450,
          letterSpacing: '-0.28px',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
        }}
        className={cn(
          'placeholder:text-white/30',
        )}
      />

      {/* action (ej: toggle password) */}
      {action}
    </div>
  );
}
