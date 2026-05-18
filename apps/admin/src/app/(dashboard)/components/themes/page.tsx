'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUILTIN_THEMES, type BuiltinTheme } from '../themes-data';

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function ThemeCard({ theme }: { theme: BuiltinTheme }) {
  return (
    <Link
      href={`/components/themes/${toSlug(theme.name)}`}
      className="group w-full flex flex-col items-center p-5 overflow-hidden cursor-pointer"
    >
      <div className="w-full translate-y-[12px] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <div className="h-full w-full" style={theme.vars as React.CSSProperties}>
            <div
              className="h-full w-full flex flex-col items-center justify-center gap-3 p-4"
              style={{ background: `hsl(${theme.vars['--background']})` }}
            >
              <h1
                className="font-semibold text-center text-sm leading-tight"
                style={{ color: `hsl(${theme.vars['--foreground']})` }}
              >
                Amazing Website
              </h1>
              <p
                className="text-center text-xs max-w-[140px] leading-relaxed"
                style={{ color: `hsl(${theme.vars['--muted-foreground']})` }}
              >
                Beautiful design with perfect colors
              </p>
              <div className="flex gap-2">
                <div
                  className="font-medium px-3 py-1 text-xs"
                  style={{
                    background: `hsl(${theme.vars['--primary']})`,
                    color: `hsl(${theme.vars['--primary-foreground']})`,
                    borderRadius: theme.vars['--radius'],
                  }}
                >
                  Get Started
                </div>
                <div
                  className="px-3 py-1 text-xs"
                  style={{
                    border: `1px solid hsl(${theme.vars['--border']})`,
                    color: `hsl(${theme.vars['--foreground']})`,
                    borderRadius: theme.vars['--radius'],
                  }}
                >
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Label — fades in on hover */}
      <div className="flex flex-col items-center pt-3 w-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <span className="text-[13px] leading-[18px] text-foreground/80 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {theme.name}
        </span>
        <p className="text-[12px] leading-[16px] text-foreground/40 mt-0.5">{theme.font}</p>
      </div>
    </Link>
  );
}

export default function ThemesPage() {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? BUILTIN_THEMES.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.font.toLowerCase().includes(search.toLowerCase())
      )
    : BUILTIN_THEMES;

  return (
    <div className="flex h-full flex-col">
      {/* Search bar */}
      <div
        className="sticky top-0 z-10 border-b border-border/50 bg-background px-4 py-2.5"
        style={{ borderBottomWidth: '0.5px' }}
      >
        <input
          type="text"
          placeholder="Search themes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
        />
        {search && (
          <span className="ml-3 text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid border-t-[0.5px] border-l-[0.5px] border-border [&>*]:border-r-[0.5px] [&>*]:border-b-[0.5px] [&>*]:border-border grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((theme) => (
            <ThemeCard key={theme.name} theme={theme} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-24 text-sm text-muted-foreground">
            No themes match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
