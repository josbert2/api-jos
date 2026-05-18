'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  Briefcase01Icon,
  Cancel01Icon,
  ComputerTerminal01Icon,
  FavouriteIcon,
  GridViewIcon,
  Logout01Icon,
  Mail01Icon,
  Menu01Icon,
  PackageIcon,
  Search01Icon,
  SourceCodeIcon,
  SparklesIcon,
  StarIcon,
  Time02Icon,
  UserGroupIcon,
  ColorsIcon,
} from '@hugeicons/core-free-icons';
import { apiGet, clearToken, getToken } from '@/lib/api';
import { AuthUser, Component } from '@/lib/types';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/projects', label: 'Proyectos', icon: GridViewIcon },
  { href: '/experiences', label: 'Experiencia', icon: Briefcase01Icon },
  { href: '/skills', label: 'Skills', icon: SourceCodeIcon },
  { href: '/messages', label: 'Mensajes', icon: Mail01Icon },
  { href: '/inspiration', label: 'Inspiración', icon: SparklesIcon },
  { href: '/components', label: 'Componentes', icon: PackageIcon },
];

const compTopLinks = [
  { href: '/components?filter=featured', label: 'Featured', icon: FavouriteIcon },
  { href: '/components?filter=newest', label: 'Newest', icon: Time02Icon },
  { href: '/components?filter=best', label: 'Best of the Week', icon: StarIcon },
  { href: '/components/themes', label: 'Themes', icon: ColorsIcon },
  { href: '/components?filter=authors', label: 'Top Authors', icon: UserGroupIcon },
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

function ComponentsSubNav({
  pathname,
  onClose,
}: {
  pathname: string | null;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    apiGet<Component[]>('/components')
      .then((items) => {
        const counts: Record<string, number> = {};
        for (const c of items) {
          for (const tag of c.tags) {
            counts[tag] = (counts[tag] ?? 0) + 1;
          }
        }
        setTagCounts(counts);
      })
      .catch(() => {});
  }, []);

  const filteredTags = Object.entries(tagCounts)
    .filter(([tag]) => !search || tag.toLowerCase().includes(search.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b));

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '?');

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Volver"
          className={cn(
            'grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors',
            'hover:bg-muted hover:text-foreground',
            focusRing,
          )}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        </button>
        <span className="text-sm font-medium text-foreground">Components</span>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1.5">
          <HugeiconsIcon icon={Search01Icon} size={13} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          />
          <kbd className="hidden sm:inline-flex text-[10px] text-muted-foreground/60 font-medium">⌘K</kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {/* Top links */}
        <div className="space-y-0.5 px-2 pb-2">
          {compTopLinks
            .filter((l) => !search || l.label.toLowerCase().includes(search.toLowerCase()))
            .map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href.split('?')[0] + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors',
                    focusRing,
                    active
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  )}
                >
                  <HugeiconsIcon icon={item.icon} size={15} className={active ? 'text-accent' : undefined} />
                  {item.label}
                </Link>
              );
            })}
        </div>

        {/* Tags section */}
        {filteredTags.length > 0 && (
          <>
            <div className="px-4 pb-1.5 pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/60">
                Tags
              </p>
            </div>
            <div className="space-y-0.5 px-2">
              {filteredTags.map(([tag, count]) => {
                const href = `/components?tag=${encodeURIComponent(tag)}`;
                const active = pathname?.includes(`tag=${tag}`);
                return (
                  <Link
                    key={tag}
                    href={href}
                    className={cn(
                      'flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors',
                      focusRing,
                      active
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                    )}
                  >
                    <span className="capitalize">{tag}</span>
                    <span className="text-xs text-muted-foreground/50">{count}</span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {filteredTags.length === 0 && search && (
          <p className="px-4 py-3 text-xs text-muted-foreground">No results for &ldquo;{search}&rdquo;</p>
        )}
      </nav>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const inComponents = pathname?.startsWith('/components') ?? false;

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    apiGet<AuthUser>('/auth/me')
      .then((me) => {
        if (me.role === 'admin') setReady(true);
        else router.replace(`/studio/${me.username}`);
      })
      .catch(() => {
        clearToken();
        router.replace('/login');
      });
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

  function goBack() {
    router.push('/projects');
  }

  const SidebarContent = (
    <div className="relative h-full overflow-hidden">
      {/* Main nav */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
          inComponents ? '-translate-x-full' : 'translate-x-0',
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
          {mainNav.map((item) => {
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
      </div>

      {/* Components sub-nav */}
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
          inComponents ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ComponentsSubNav pathname={pathname} onClose={goBack} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background md:flex">
      {/* Backdrop (mobile) */}
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
        {SidebarContent}
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
