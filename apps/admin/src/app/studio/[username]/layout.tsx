'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ComputerTerminal01Icon,
  Logout01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { apiGet, clearToken, getToken } from '@/lib/api';
import { AuthUser } from '@/lib/types';
import { cn } from '@/lib/utils';
import { StudioUserContext } from './studio-context';

function AvatarMenu({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const initial = (user.name || user.username || '?').charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menú de cuenta"
        className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xs font-medium text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {user.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={user.avatar} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.4rem)] w-52 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-[0_8px_28px_-8px_oklch(0.21_0.012_264_/_0.18)]"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name || user.username}
            </p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Link
            href={`/studio/${user.username}/profile`}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <HugeiconsIcon icon={UserIcon} size={16} />
            Perfil público
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} />
            Salir
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ username: string }>();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    let alive = true;
    apiGet<AuthUser>('/auth/me')
      .then((me) => {
        if (!alive) return;
        // El Studio es privado: solo el dueño ve su propio /studio/<username>.
        if (me.username !== params.username) {
          router.replace(`/studio/${me.username}`);
          return;
        }
        setUser(me);
      })
      .catch(() => {
        clearToken();
        router.replace('/login');
      });
    return () => {
      alive = false;
    };
  }, [router, params.username]);

  function logout() {
    clearToken();
    router.replace('/login');
  }

  if (!user) return null;

  const base = `/studio/${user.username}`;
  const tabs = [
    { href: base, label: 'Components' },
    { href: `${base}/explore`, label: 'Explore' },
    { href: `${base}/profile`, label: 'Public Profile' },
  ];

  return (
    <StudioUserContext.Provider value={user}>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="fixed inset-x-0 top-0 z-20 h-11 border-b border-border bg-card">
          <div className="flex h-full items-center justify-between px-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                  <HugeiconsIcon
                    icon={ComputerTerminal01Icon}
                    size={13}
                    strokeWidth={2}
                    className="text-accent"
                  />
                </span>
                <span className="text-sm font-medium text-foreground">Studio</span>
              </div>
              <nav className="flex items-center gap-0.5">
                {tabs.map((t) => {
                  const active = t.href === base ? pathname === base : pathname?.startsWith(t.href);
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'rounded-md px-2.5 py-1 text-xs transition-colors',
                        'outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        active
                          ? 'bg-muted font-medium text-foreground'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                      )}
                    >
                      {t.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <AvatarMenu user={user} onLogout={logout} />
          </div>
        </header>

        <div className="flex-1 pt-11">{children}</div>
      </div>
    </StudioUserContext.Provider>
  );
}
