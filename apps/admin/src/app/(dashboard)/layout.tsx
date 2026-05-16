'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Briefcase01Icon,
  Cancel01Icon,
  ComputerTerminal01Icon,
  GridViewIcon,
  Logout01Icon,
  Mail01Icon,
  Menu01Icon,
  SourceCodeIcon,
} from '@hugeicons/core-free-icons';
import { clearToken, getToken } from '@/lib/api';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/projects', label: 'Proyectos', icon: GridViewIcon },
  { href: '/experiences', label: 'Experiencia', icon: Briefcase01Icon },
  { href: '/skills', label: 'Skills', icon: SourceCodeIcon },
  { href: '/messages', label: 'Mensajes', icon: Mail01Icon },
];

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <HugeiconsIcon
          icon={ComputerTerminal01Icon}
          size={16}
          strokeWidth={2}
          className="text-accent"
        />
      </span>
      <span className="font-mono text-[0.8rem] tracking-tight text-foreground">
        josbert.dev<span className="text-muted-foreground">/admin</span>
      </span>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace('/login');
    else setReady(true);
  }, [router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!ready) return null;

  function logout() {
    clearToken();
    router.replace('/login');
  }

  return (
    <div className="min-h-screen bg-background md:flex">
      {/* Backdrop del drawer (solo mobile) */}
      <div
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={cn(
          'fixed inset-0 z-30 bg-foreground/40 transition-opacity duration-200 md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-border bg-card',
          'md:sticky md:top-0 md:bottom-auto md:z-auto md:h-screen md:flex',
          mobileOpen ? 'flex' : 'hidden',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <Brand />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className={cn(
              'grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors',
              'hover:bg-muted hover:text-foreground md:hidden',
              focusRing,
            )}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  focusRing,
                  active
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={18}
                  className={active ? 'text-accent' : undefined}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={logout}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              focusRing,
            )}
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} />
            Salir
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            className={cn(
              'grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors',
              'hover:bg-muted hover:text-foreground',
              focusRing,
            )}
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>
          <Brand />
        </header>

        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
