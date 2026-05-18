'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  AiMagicIcon,
  CodeIcon,
  Copy01Icon,
  EyeIcon,
  SourceCodeIcon,
  Tick02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { apiGet } from '@/lib/api';
import { Component, PublicProfile } from '@/lib/types';
import { SandpackPreviewPane } from '@/app/(dashboard)/components/sandpack-preview';

const REGISTRY_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001') + '/r';

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en', { day: 'numeric', month: 'numeric', year: 'numeric' });
  } catch { return '—'; }
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-white/[0.04] border border-white/[0.06] p-4 text-[12px] leading-relaxed font-mono text-white/70 whitespace-pre-wrap break-all">
      <code>{code}</code>
    </pre>
  );
}

export default function ComponentDetailPage() {
  const { username, name } = useParams<{ username: string; name: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (!username) return;
    apiGet<PublicProfile>(`/users/${username}`)
      .then((p) => setProfile(p))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  const component: Component | null = profile?.components.find((c) => c.name === name) ?? null;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090B]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
      </div>
    );
  }

  if (notFound || !profile || !component) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101010] px-4">
        <div className="text-center">
          <p className="text-5xl font-semibold text-white/10">404</p>
          <p className="mt-3 text-sm font-medium text-white/70">Componente no encontrado</p>
          <Link href={`/${username}`} className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
            Volver al perfil
          </Link>
        </div>
      </main>
    );
  }

  const installCmd = `npx shadcn@latest add ${REGISTRY_BASE}/${component.author}/${component.name}`;

  return (
    <div className="h-svh overflow-hidden bg-[#101010] text-[rgb(244,244,245)] flex flex-col" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 h-10 z-10 bg-[#101010] border-b border-white/[0.07]" style={{ borderBottomWidth: '0.5px' }}>
        <div className="relative h-full flex items-center justify-between px-2.5">
          {/* Back */}
          <Link href={`/${username}`} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors rounded-md px-2 h-7 hover:bg-white/[0.06]">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
          </Link>

          {/* Center breadcrumb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="pointer-events-auto flex items-center gap-1.5 text-[13px]">
              <Link href={`/${username}`} className="font-medium text-white/40 hover:text-white/70 transition-colors">
                {profile.name || profile.username}
              </Link>
              <span className="text-white/20">/</span>
              <span className="font-medium text-white capitalize">{component.title}</span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(component.demo ?? '').then(() => { setCopiedCode(true); setTimeout(() => setCopiedCode(false), 1600); })}
              className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
            >
              <HugeiconsIcon icon={copiedCode ? Tick02Icon : SourceCodeIcon} size={13} />
              <span className="hidden sm:inline">{copiedCode ? 'Copied' : 'Copy code'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(installCmd).then(() => { setCopiedInstall(true); setTimeout(() => setCopiedInstall(false), 1600); })}
              className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
            >
              <HugeiconsIcon icon={copiedInstall ? Tick02Icon : Copy01Icon} size={13} />
              <span className="hidden sm:inline">{copiedInstall ? 'Copied' : 'Copy install'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex w-full flex-1 flex-col lg:flex-row overflow-hidden pt-10">

        {/* Preview — order-1 en lg */}
        <div className="order-1 bg-[#09090B] lg:order-2 relative flex flex-col items-center justify-center p-2 w-full min-h-[50vh] lg:h-full lg:overflow-hidden lg:flex-1">
          {/* Rounded container */}
          <div className="bg-[#09090B] h-full w-full overflow-clip rounded-[12px]">
            <div className="h-full w-full relative overflow-hidden">
              <SandpackPreviewPane component={component} theme="dark" style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Info panel — order-2 en lg */}
        <div className="no-scrollbar order-2 lg:order-1 z-1 flex flex-col justify-start lg:justify-end px-4 w-full lg:h-full lg:w-[30%]">
          <div className="no-scrollbar relative h-full w-full lg:overflow-x-hidden lg:overflow-y-auto">
            {/* Fade gradient al bottom */}
            <div className="z-2 sticky top-full w-full -translate-y-full pointer-events-none" aria-hidden="true">
              <div className="absolute inset-x-0 -bottom-6 -mx-4 h-20 bg-gradient-to-t from-[#101010] to-transparent" />
            </div>

            <div className="mt-4 mb-[9vh] lg:p-5 lg:pl-8 flex flex-col gap-6">

              {/* Título + descripción */}
              <div>
                <h3 className="text-base font-semibold text-white">{component.title}</h3>
                {component.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">{component.description}</p>
                )}
              </div>

              {/* Created by */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">Created by</p>
                <Link href={`/${username}`} className="flex items-center gap-3 group">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-white/[0.06] border border-white/[0.08]"
                    style={{ borderRadius: '30%' }}
                  >
                    {profile.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <HugeiconsIcon icon={UserIcon} size={18} className="text-white/40" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 group-hover:underline">
                      {profile.name || profile.username}
                    </p>
                    <p className="text-sm text-white/40">@{profile.username}</p>
                  </div>
                </Link>
              </div>

              {/* Installation */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">Installation</p>
                <div
                  className="font-mono rounded-md cursor-pointer overflow-auto bg-white/[0.05] p-2 text-sm w-full relative group"
                  onClick={() => navigator.clipboard?.writeText(installCmd).then(() => { setCopiedInstall(true); setTimeout(() => setCopiedInstall(false), 1600); })}
                >
                  <code className="text-xs text-white/60 break-all">{installCmd}</code>
                  <span className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/30">
                    <HugeiconsIcon icon={copiedInstall ? Tick02Icon : Copy01Icon} size={13} />
                  </span>
                </div>
              </div>

              {/* How to use */}
              {component.demo && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">How to use</p>
                  <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const prompt = `Add the ${component.title} component to my project.\n\nInstall it with:\n${installCmd}\n\nUsage:\n${component.demo}`;
                        navigator.clipboard?.writeText(prompt).then(() => { setCopiedPrompt(true); setTimeout(() => setCopiedPrompt(false), 1600); });
                      }}
                      className="bg-white/[0.06] hover:bg-white/[0.09] active:scale-95 flex h-7 w-fit cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs transition-all duration-150 whitespace-nowrap text-white/50 hover:text-white/80"
                    >
                      <HugeiconsIcon icon={copiedPrompt ? Tick02Icon : AiMagicIcon} size={12} />
                      {copiedPrompt ? 'Copied' : 'Copy prompt'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(component.demo!).then(() => { setCopiedCode(true); setTimeout(() => setCopiedCode(false), 1600); })}
                      className="bg-white/[0.06] hover:bg-white/[0.09] active:scale-95 flex h-7 w-fit cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs transition-all duration-150 whitespace-nowrap text-white/50 hover:text-white/80"
                    >
                      <HugeiconsIcon icon={copiedCode ? Tick02Icon : Copy01Icon} size={12} />
                      {copiedCode ? 'Copied' : 'Copy code'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCode((v) => !v)}
                      className={`bg-white/[0.06] hover:bg-white/[0.09] active:scale-95 flex h-7 w-fit cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs transition-all duration-150 whitespace-nowrap ${showCode ? 'text-white/80' : 'text-white/50 hover:text-white/80'}`}
                    >
                      <HugeiconsIcon icon={showCode ? EyeIcon : CodeIcon} size={12} />
                      {showCode ? 'Hide code' : 'View code'}
                    </button>
                  </div>
                  {showCode && (
                    <div className="overflow-hidden rounded-md">
                      <CodeBlock code={component.demo} />
                    </div>
                  )}
                </div>
              )}

              {/* Dependencies */}
              {component.dependencies.length > 0 && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">Dependencies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {component.dependencies.map((dep) => (
                      <span key={dep} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-white/50">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {component.tags.length > 0 && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {component.tags.map((tag) => (
                      <span key={tag} className="bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 px-3 py-1 rounded-full text-sm transition-colors cursor-default capitalize">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-4 text-xs text-white/25">
                  <span>Created {fmtDate(component.createdAt)}</span>
                  {component.updatedAt !== component.createdAt && (
                    <span>Updated {fmtDate(component.updatedAt)}</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
