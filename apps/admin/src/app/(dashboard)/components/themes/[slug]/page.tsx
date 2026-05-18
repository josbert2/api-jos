'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  Copy01Icon,
  Sun01Icon,
  Moon02Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { BUILTIN_THEMES, type BuiltinTheme } from '../../themes-data';
import { cn } from '@/lib/utils';

/* ── helpers ─────────────────────────────────────────────────────────────── */

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function hslToHex(hslStr: string): string {
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length < 3) return '#000000';
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const COLOR_GROUPS: { label: string; keys: string[] }[] = [
  { label: 'Primary Colors', keys: ['--primary', '--primary-foreground'] },
  { label: 'Secondary Colors', keys: ['--secondary', '--secondary-foreground'] },
  { label: 'Base Colors', keys: ['--background', '--foreground', '--card', '--card-foreground'] },
  { label: 'Accent Colors', keys: ['--accent', '--accent-foreground', '--muted', '--muted-foreground'] },
  { label: 'Destructive', keys: ['--destructive', '--destructive-foreground'] },
  { label: 'Border & Input', keys: ['--border', '--input', '--ring'] },
];

const KEY_LABELS: Record<string, string> = {
  '--primary': 'Primary', '--primary-foreground': 'Primary Foreground',
  '--secondary': 'Secondary', '--secondary-foreground': 'Secondary Foreground',
  '--background': 'Background', '--foreground': 'Foreground',
  '--card': 'Card', '--card-foreground': 'Card Foreground',
  '--accent': 'Accent', '--accent-foreground': 'Accent Foreground',
  '--muted': 'Muted', '--muted-foreground': 'Muted Foreground',
  '--destructive': 'Destructive', '--destructive-foreground': 'Destructive Foreground',
  '--border': 'Border', '--input': 'Input', '--ring': 'Ring',
};

/* ── preview iframe srcdoc ──────────────────────────────────────────────── */

function buildPreviewDoc(theme: BuiltinTheme): string {
  const vars = Object.entries(theme.vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');

  const bg = `hsl(${theme.vars['--background'] ?? '0 0% 9%'})`;
  const fg = `hsl(${theme.vars['--foreground'] ?? '0 0% 90%'})`;
  const primary = `hsl(${theme.vars['--primary'] ?? '0 0% 98%'})`;
  const primaryFg = `hsl(${theme.vars['--primary-foreground'] ?? '0 0% 4%'})`;
  const card = `hsl(${theme.vars['--card'] ?? '0 0% 15%'})`;
  const border = `hsl(${theme.vars['--border'] ?? '0 0% 25%'})`;
  const muted = `hsl(${theme.vars['--muted'] ?? '0 0% 15%'})`;
  const mutedFg = `hsl(${theme.vars['--muted-foreground'] ?? '0 0% 63%'})`;
  const secondary = `hsl(${theme.vars['--secondary'] ?? '0 0% 15%'})`;
  const secondaryFg = `hsl(${theme.vars['--secondary-foreground'] ?? '0 0% 90%'})`;
  const radius = theme.vars['--radius'] ?? '0.5rem';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
${vars}
}
body{
  background:${bg};
  color:${fg};
  font-family:${theme.font},system-ui,sans-serif;
  font-size:14px;
  line-height:1.5;
  padding:24px;
}
.card{background:${card};border:1px solid ${border};border-radius:${radius};padding:20px}
.label{color:${mutedFg};font-size:11px;margin-bottom:4px}
.value{font-size:22px;font-weight:700;letter-spacing:-0.02em}
.delta{color:${mutedFg};font-size:11px;margin-top:2px}
.btn-primary{background:${primary};color:${primaryFg};border:none;padding:8px 16px;border-radius:${radius};font-size:12px;font-weight:500;cursor:pointer}
.btn-outline{background:transparent;color:${fg};border:1px solid ${border};padding:8px 16px;border-radius:${radius};font-size:12px;font-weight:500;cursor:pointer}
.btn-secondary{background:${secondary};color:${secondaryFg};border:none;padding:8px 16px;border-radius:${radius};font-size:12px;font-weight:500;cursor:pointer}
.badge{background:${muted};color:${mutedFg};padding:2px 8px;border-radius:99px;font-size:11px;display:inline-block}
.input{background:${muted};border:1px solid ${border};color:${fg};padding:7px 12px;border-radius:${radius};font-size:12px;width:100%;outline:none}
.divider{height:1px;background:${border};margin:16px 0}
.row{display:flex;gap:8px;align-items:center}
.bar-bg{background:${muted};height:6px;border-radius:99px;flex:1;overflow:hidden}
.bar-fill{height:100%;border-radius:99px;background:${primary}}
.muted{color:${mutedFg};font-size:11px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.nav-item{color:${mutedFg};font-size:12px;padding:4px 10px;border-radius:${radius}}
.nav-item.active{background:${muted};color:${fg};font-weight:500}
h4{font-size:12px;font-weight:600;margin-bottom:12px;color:${fg}}
</style>
</head>
<body>
<div class="header">
  <div class="row" style="gap:16px">
    <div style="width:24px;height:24px;background:${primary};border-radius:6px"></div>
    <nav class="row" style="gap:4px">
      <div class="nav-item active">Dashboard</div>
      <div class="nav-item">Projects</div>
      <div class="nav-item">Settings</div>
    </nav>
  </div>
  <div class="row" style="gap:8px">
    <button class="btn-outline" style="padding:5px 12px">New</button>
    <button class="btn-primary" style="padding:5px 12px">Deploy</button>
  </div>
</div>

<div class="grid3" style="margin-bottom:12px">
  <div class="card">
    <div class="label">Total Revenue</div>
    <div class="value">$15,231</div>
    <div class="delta">+20.1% last month</div>
  </div>
  <div class="card">
    <div class="label">Active Users</div>
    <div class="value">2,350</div>
    <div class="delta">+12.5% last month</div>
  </div>
  <div class="card">
    <div class="label">Conversion</div>
    <div class="value">3.24%</div>
    <div class="delta">+1.2% last month</div>
  </div>
</div>

<div class="grid2" style="margin-bottom:12px">
  <div class="card">
    <h4>Analytics</h4>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${['Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => {
        const pct = [40,65,50,80,60,90][i];
        return `<div class="row"><span class="muted" style="width:28px">${d}</span><div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div><span class="muted" style="width:28px;text-align:right">${pct}%</span></div>`;
      }).join('')}
    </div>
  </div>
  <div class="card">
    <h4>Recent Activity</h4>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${[
        ['Deployment #42','2m ago','success'],
        ['Build #139','18m ago','success'],
        ['PR #87 merged','1h ago','info'],
        ['Test suite ran','2h ago','muted'],
      ].map(([title, time, type]) => `
        <div class="row" style="justify-content:space-between">
          <div>
            <div style="font-size:12px;font-weight:500">${title}</div>
            <div class="muted">${time}</div>
          </div>
          <span class="badge">${type}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>

<div class="card">
  <h4>Quick Actions</h4>
  <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:14px">
    <button class="btn-primary">Create project</button>
    <button class="btn-secondary">View reports</button>
    <button class="btn-outline">Import data</button>
  </div>
  <div class="divider"></div>
  <div class="grid2" style="gap:8px;margin-top:12px">
    <input class="input" placeholder="Search components…" />
    <input class="input" placeholder="Filter by tag…" />
  </div>
</div>
</body>
</html>`;
}

/* ── color swatch row ────────────────────────────────────────────────────── */

function SwatchRow({
  cssKey,
  hslValue,
  onCopy,
  copied,
}: {
  cssKey: string;
  hslValue: string;
  onCopy: (hex: string) => void;
  copied: boolean;
}) {
  const hex = hslToHex(hslValue);
  const label = KEY_LABELS[cssKey] ?? cssKey.replace('--', '');

  return (
    <button
      type="button"
      title={`${label}: ${hex} (click to copy)`}
      onClick={() => onCopy(hex)}
      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors w-full text-left"
    >
      <div
        className="w-6 h-6 rounded shrink-0 border border-border/40 shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground font-mono">{hex}</div>
      </div>
      <div className="shrink-0 text-muted-foreground/40">
        <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={12} />
      </div>
    </button>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

export default function ThemeDetailPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const theme = BUILTIN_THEMES.find((t) => toSlug(t.name) === slug);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const copyHex = useCallback((hex: string, key: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1400);
  }, []);

  const copyCSS = useCallback(() => {
    if (!theme) return;
    const css = `:root {\n${Object.entries(theme.vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n')}\n}`;
    navigator.clipboard?.writeText(css);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 1400);
  }, [theme]);

  if (!theme) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Theme not found.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-44px-2.5rem)] -mx-5 -mb-5 md:-mx-8 md:-mb-8 flex flex-col">
      {/* Topbar */}
      <div
        className="shrink-0 h-10 flex items-center justify-between px-3 border-b border-border bg-card"
        style={{ borderBottomWidth: '0.5px' }}
      >
        <div className="flex items-center gap-1.5 text-[13px]">
          <button
            type="button"
            onClick={() => router.push('/components/themes')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Themes
          </button>
          <span className="text-muted-foreground/50">/</span>
          <span className="font-medium text-foreground">{theme.name}</span>
        </div>
        <button
          type="button"
          onClick={copyCSS}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <HugeiconsIcon icon={copiedCSS ? Tick02Icon : Copy01Icon} size={13} />
          {copiedCSS ? 'Copied' : 'Copy CSS'}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left: palette */}
        <div
          className="w-72 shrink-0 flex flex-col border-r border-border overflow-hidden"
          style={{ borderRightWidth: '0.5px' }}
        >
          {/* Palette header */}
          <div
            className="h-10 shrink-0 flex items-center justify-between px-4 border-b border-border"
            style={{ borderBottomWidth: '0.5px' }}
          >
            <h2 className="text-sm font-medium">Color Palette</h2>
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
              dark
            </span>
          </div>

          {/* Swatches */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
            {COLOR_GROUPS.map((group) => {
              const entries = group.keys.filter((k) => theme.vars[k]);
              if (!entries.length) return null;
              return (
                <div key={group.label} className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground mb-1.5">
                    {group.label}
                  </h3>
                  {entries.map((k) => (
                    <SwatchRow
                      key={k}
                      cssKey={k}
                      hslValue={theme.vars[k]!}
                      onCopy={(hex) => copyHex(hex, k)}
                      copied={copiedKey === k}
                    />
                  ))}
                </div>
              );
            })}

            {/* Other props */}
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-muted-foreground mb-1.5">
                Other Properties
              </h3>
              <div className="flex items-center gap-3 p-2">
                <div className="w-6 h-6 rounded border border-border bg-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground">Border Radius</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {theme.vars['--radius']}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2">
                <div className="w-6 h-6 rounded border border-border bg-muted shrink-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-foreground">Aa</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground">Sans Font</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {theme.font}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className="h-10 shrink-0 flex items-center px-4 border-b border-border"
            style={{ borderBottomWidth: '0.5px' }}
          >
            <h2 className="text-sm font-medium">Preview</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              title="theme-preview"
              sandbox="allow-scripts"
              srcDoc={buildPreviewDoc(theme)}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
