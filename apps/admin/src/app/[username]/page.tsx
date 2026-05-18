'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Copy01Icon,
  PackageIcon,
  Tick02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { apiGet } from '@/lib/api';
import { Component, PublicProfile } from '@/lib/types';
import { cn } from '@/lib/utils';

const REGISTRY_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/r';

function ComponentCard({ c, username }: { c: Component; username: string }) {
  const [copied, setCopied] = useState(false);

  function copyCmd(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard
      ?.writeText(`npx shadcn@latest add ${REGISTRY_BASE}/${c.author}/${c.name}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
  }

  return (
    <Link
      href={`/${username}/${c.name}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        {c.preview ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={c.preview}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <HugeiconsIcon icon={PackageIcon} size={26} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="line-clamp-1 text-sm font-medium text-foreground">{c.title}</p>
        <code className="font-mono text-xs text-muted-foreground">{c.name}</code>
        {c.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {c.description}
          </p>
        )}
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <button
          type="button"
          onClick={copyCmd}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            'outline-none focus-visible:ring-2 focus-visible:ring-ring',
            copied
              ? 'bg-muted text-accent'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
          )}
        >
          <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={13} />
          {copied ? 'Copiado' : 'npx shadcn@latest add'}
        </button>
      </div>
    </Link>
  );
}

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    apiGet<PublicProfile>(`/users/${username}`)
      .then((p) => setProfile(p))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <div className="mb-10 flex items-center gap-5">
          <div className="h-14 w-14 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-52 rounded-xl bg-muted" />
          ))}
        </div>
      </main>
    );
  }

  if (notFound || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <p className="text-6xl font-semibold text-muted-foreground/30">404</p>
          <p className="mt-3 text-sm font-medium text-foreground">Usuario no encontrado</p>
          <p className="mt-1 text-xs text-muted-foreground">
            @{username} no existe o no tiene perfil público.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center text-xs font-medium text-foreground underline-offset-4 hover:underline"
          >
            Volver al inicio
          </a>
        </div>
      </main>
    );
  }

  const initial = (profile.name || profile.username).charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-background">
      {/* Header minimalista */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-lg font-semibold text-foreground">
              {profile.avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <HugeiconsIcon icon={UserIcon} size={22} className="text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-semibold text-foreground">
                {profile.name || profile.username}
              </h1>
              <p className="font-mono text-xs text-muted-foreground">@{profile.username}</p>
              {profile.bio && (
                <p className="mt-1 line-clamp-2 max-w-sm text-xs text-muted-foreground">
                  {profile.bio}
                </p>
              )}
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{profile.components.length}</span>
              {profile.components.length === 1 ? 'componente' : 'componentes'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de componentes */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {profile.components.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border/60 py-20 text-center">
            <HugeiconsIcon icon={PackageIcon} size={24} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {profile.name || profile.username} todavía no publicó componentes.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.components.map((c) => (
              <ComponentCard key={c.id} c={c} username={profile.username} />
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-border py-6 text-center">
        <a
          href="/"
          className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          josbert.dev
        </a>
      </footer>
    </main>
  );
}
