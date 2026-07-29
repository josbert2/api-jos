'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Briefcase01Icon,
  Cancel01Icon,
  ColorsIcon,
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
} from '@hugeicons/core-free-icons';
import { apiGet, clearToken, getToken } from '@/lib/api';
import { AuthUser, Component } from '@/lib/types';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/projects',    label: 'Proyectos',   icon: GridViewIcon },
  { href: '/experiences', label: 'Experiencia', icon: Briefcase01Icon },
  { href: '/skills',      label: 'Skills',      icon: SourceCodeIcon },
  { href: '/messages',    label: 'Mensajes',    icon: Mail01Icon },
  { href: '/inspiration', label: 'Inspiración', icon: SparklesIcon },
  { href: '/components',  label: 'Componentes', icon: PackageIcon },
];

const compLinks = [
  { href: '/components?filter=featured', label: 'Featured',         icon: FavouriteIcon },
  { href: '/components?filter=newest',   label: 'Newest',           icon: Time02Icon },
  { href: '/components?filter=best',     label: 'Best of the Week', icon: StarIcon },
  { href: '/components/themes',          label: 'Themes',           icon: ColorsIcon },
  { href: '/themes/create',              label: 'Theme Creator',    icon: SparklesIcon },
  { href: '/components?filter=authors',  label: 'Top Authors',      icon: UserGroupIcon },
];

const focusRing = 'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* ── Logo ── */
function Logo() {
  return (
    <Link href="/projects" className={cn('flex items-center gap-2', focusRing)}>
      <svg viewBox="0 0 1103 386" height="18" aria-label="josbert.dev" className="shrink-0">
        <path fill="#FFF312" d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z"/>
      </svg>
      <span
        className="hidden font-mono text-[0.72rem] tracking-tight sm:block"
        style={{ color: 'rgb(173,183,190)' }}
      >
        josbert<span className="text-foreground/80">.dev</span>
        <span style={{ color: 'rgb(92,92,92)' }}>/admin</span>
      </span>
    </Link>
  );
}

/* ── Components sub-nav (drawer inside the sidebar on /components) ── */
function CompSubNav({ pathname }: { pathname: string | null }) {
  const [search, setSearch] = useState('');
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    apiGet<Component[]>('/components')
      .then((items) => {
        const counts: Record<string, number> = {};
        for (const c of items)
          for (const tag of c.tags)
            counts[tag] = (counts[tag] ?? 0) + 1;
        setTagCounts(counts);
      })
      .catch(() => {});
  }, []);

  const filteredTags = Object.entries(tagCounts)
    .filter(([tag]) => !search || tag.toLowerCase().includes(search.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <aside className="w-52 shrink-0 border-r border-border flex flex-col">
      {/* search */}
      <div className="px-3 py-3 border-b border-border/60">
        <div
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
          style={{ borderColor: 'rgb(36,36,36)', background: 'rgb(20,20,20)' }}
        >
          <HugeiconsIcon icon={Search01Icon} size={13} style={{ color: 'rgb(92,92,92)' }} />
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-[rgb(72,72,72)]"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-px">
        {compLinks
          .filter((l) => !search || l.label.toLowerCase().includes(search.toLowerCase()))
          .map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href.split('?')[0] + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2.5 py-2 text-[14px] font-[450] leading-5 transition-colors duration-200',
                  focusRing,
                  active
                    ? 'text-[rgb(248,248,248)]'
                    : 'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={14}
                  strokeWidth={1.8}
                  className={cn('shrink-0', active ? 'text-[rgb(248,248,248)]' : 'text-[rgb(92,92,92)]')}
                />
                {item.label}
              </Link>
            );
          })}

        {filteredTags.length > 0 && (
          <>
            <p className="px-2.5 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgb(72,72,72)' }}>
              Tags
            </p>
            {filteredTags.map(([tag, count]) => {
              const href = `/components?tag=${encodeURIComponent(tag)}`;
              const active = pathname?.includes(`tag=${tag}`);
              return (
                <Link
                  key={tag}
                  href={href}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-[450] leading-5 transition-colors duration-200 capitalize',
                    focusRing,
                    active ? 'text-[rgb(248,248,248)]' : 'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
                  )}
                >
                  {tag}
                  <span className="text-[11px]" style={{ color: 'rgb(72,72,72)' }}>{count}</span>
                </Link>
              );
            })}
          </>
        )}

        {filteredTags.length === 0 && search && (
          <p className="px-2.5 py-3 text-[13px]" style={{ color: 'rgb(92,92,92)' }}>
            Sin resultados para &ldquo;{search}&rdquo;
          </p>
        )}
      </nav>
    </aside>
  );
}

/* ── Mobile drawer ── */
function MobileMenu({
  open,
  onClose,
  pathname,
  onLogout,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  onLogout: () => void;
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-card border-r border-border transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-border">
          <Logo />
          <button
            onClick={onClose}
            className={cn('grid h-8 w-8 place-items-center rounded-md transition-colors', focusRing)}
            style={{ color: 'rgb(92,92,92)' }}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-px">
          {mainNav.map((item) => {
            const active = pathname?.startsWith(item.href) ?? false;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-[450] leading-5 transition-colors duration-200',
                  focusRing,
                  active ? 'text-[rgb(248,248,248)]' : 'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={16}
                  strokeWidth={1.8}
                  className={cn('shrink-0', active ? 'text-[rgb(248,248,248)]' : 'text-[rgb(92,92,92)]')}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-3 py-3">
          <button
            onClick={onLogout}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-[450] leading-5 transition-colors',
              'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
              focusRing,
            )}
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.8} className="shrink-0 text-[rgb(92,92,92)]" />
            Salir
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Root layout ── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const inComponents = pathname?.startsWith('/components') ?? false;

  useEffect(() => {
    if (!getToken()) { router.replace('/login'); return; }
    apiGet<AuthUser>('/auth/me')
      .then((me) => {
        if (me.role === 'admin') setReady(true);
        else router.replace(`/studio/${me.username}`);
      })
      .catch(() => { clearToken(); router.replace('/login'); });
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!ready) return null;

  function logout() { clearToken(); router.replace('/login'); }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top nav ── */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="flex h-14 items-center gap-2 px-4 md:px-6">

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-md transition-colors md:hidden', focusRing)}
            style={{ color: 'rgb(92,92,92)' }}
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>

          {/* logo */}
          <Logo />

          {/* nav links — desktop */}
          <nav className="hidden md:flex items-center gap-0.5 ml-4 flex-1">
            {mainNav.map((item) => {
              const active = pathname?.startsWith(item.href) ?? false;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-[450] leading-5 transition-colors duration-200',
                    focusRing,
                    active
                      ? 'text-[rgb(248,248,248)]'
                      : 'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* logout — desktop */}
          <button
            onClick={logout}
            className={cn(
              'hidden md:flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-[450] leading-5 transition-colors duration-200 ml-auto',
              'text-[rgb(173,183,190)] hover:text-[rgb(248,248,248)]',
              focusRing,
            )}
          >
            <HugeiconsIcon icon={Logout01Icon} size={15} strokeWidth={1.8} className="text-[rgb(92,92,92)]" />
            Salir
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">
        {/* components sub-nav (only on /components) */}
        {inComponents && <CompSubNav pathname={pathname} />}

        <main className="flex-1 overflow-auto p-5 md:p-8">{children}</main>
      </div>

      {/* mobile drawer */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        onLogout={logout}
      />
    </div>
  );
}
