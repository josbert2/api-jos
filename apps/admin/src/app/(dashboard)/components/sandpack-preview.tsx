'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Component } from '@/lib/types';

const EMPTY_DEMO =
  'export default function Demo() {\n' +
  '  return <div style={{padding:32,fontSize:13,color:"#777"}}>Sin demo.</div>;\n' +
  '}';

// Packages that peer-depend on React and must use the same instance via importmap
const REACT_PEERS = new Set([
  'lucide-react', 'framer-motion', 'vaul', 'sonner', 'cmdk',
  '@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
]);

function buildImportmap(deps: string[]): Record<string, string> {
  const map: Record<string, string> = {
    'react':             'https://esm.sh/react@18.3.1',
    'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime',
    'react-dom':         'https://esm.sh/react-dom@18.3.1',
    'react-dom/client':  'https://esm.sh/react-dom@18.3.1/client',
    'class-variance-authority': 'https://esm.sh/class-variance-authority@0.7.0',
    'clsx':              'https://esm.sh/clsx@2.1.1',
    'tailwind-merge':    'https://esm.sh/tailwind-merge@2.5.4',
    'lucide-react':      'https://esm.sh/lucide-react?external=react,react-dom',
    'framer-motion':     'https://esm.sh/framer-motion@11?external=react,react-dom',
    '@radix-ui/react-slot': 'https://esm.sh/@radix-ui/react-slot?external=react',
  };
  for (const dep of deps) {
    if (!map[dep] && !['react', 'react-dom'].includes(dep)) {
      const ext = REACT_PEERS.has(dep) ? '?external=react,react-dom' : '';
      map[dep] = `https://esm.sh/${dep}${ext}`;
    }
  }
  return map;
}

function buildSrcdoc(component: Component, theme: 'light' | 'dark'): string {
  const raw = component.demo?.trim() ? component.demo : EMPTY_DEMO;

  const fixAliases = (s: string) =>
    s.replace(/@\/lib\/utils/g, '__UTILS__').replace(/@\//g, './');

  const files = component.files.map((f) => ({
    path: f.path.replace(/^\/?(src\/)?/, '').replace(/\.tsx?$/, ''),
    content: fixAliases(f.content),
  }));

  const demoContent = fixAliases(raw);
  const bg    = theme === 'dark' ? '#09090b' : '#ffffff';
  const color = theme === 'dark' ? 'hsl(240 4.8% 95.9%)' : '#09090b';

  const importmap = buildImportmap(component.dependencies);
  const importmapJson = JSON.stringify({ imports: importmap });
  const filesJson     = JSON.stringify(files);
  const demoJson      = JSON.stringify(demoContent);

  // Deps to load eagerly (importmap keys that aren't react/jsx-runtime)
  const eagerKeys = Object.keys(importmap).filter(
    (k) => !['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'].includes(k)
  );
  const eagerJson = JSON.stringify(eagerKeys);

  const isDark = theme === 'dark';
  const cssVars = isDark ? `
    --background: 222.2 84% 4.9%; --foreground: 210 40% 98%;
    --primary: 210 40% 98%; --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%; --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%; --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%; --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%; --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%; --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%; --radius: 0.5rem;` : `
    --background: 0 0% 100%; --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%; --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%; --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%; --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%; --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%; --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%; --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%; --radius: 0.5rem;`;

  return `<!DOCTYPE html>
<html lang="en"${isDark ? ' class="dark"' : ''}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>
    window.tailwind = { config: { darkMode: 'class', theme: { extend: {
      colors: {
        border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        primary:     { DEFAULT: 'hsl(var(--primary))',     foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))',   foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))',       foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))',      foreground: 'hsl(var(--accent-foreground))' },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
    }}}};
  <\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <script type="importmap">${importmapJson}<\/script>
  <style>
    :root { ${cssVars} }
    * { box-sizing: border-box; }
    body { margin: 0; background: ${bg}; color: ${color}; font-family: 'ABC Diatype', system-ui, -apple-system, sans-serif; }
    #root { min-height: 100vh; }
    #err { display:none; position:fixed; inset:0; padding:20px; font-size:11px; font-family:monospace; color:#f87171; overflow:auto; white-space:pre-wrap; word-break:break-all; }
    /* shadcn token overrides — Tailwind CDN can't emit opacity variants from CSS vars */
    .bg-background{background-color:hsl(var(--background))}
    .bg-foreground{background-color:hsl(var(--foreground))}
    .bg-primary{background-color:hsl(var(--primary))}
    .bg-primary\\/80,.hover\\:bg-primary\\/80:hover{background-color:hsl(var(--primary)/0.8)}
    .bg-secondary{background-color:hsl(var(--secondary))}
    .bg-secondary\\/80,.hover\\:bg-secondary\\/80:hover{background-color:hsl(var(--secondary)/0.8)}
    .bg-destructive{background-color:hsl(var(--destructive))}
    .bg-destructive\\/80,.hover\\:bg-destructive\\/80:hover{background-color:hsl(var(--destructive)/0.8)}
    .bg-muted{background-color:hsl(var(--muted))}
    .bg-muted\\/80,.hover\\:bg-muted\\/80:hover{background-color:hsl(var(--muted)/0.8)}
    .bg-accent{background-color:hsl(var(--accent))}
    .bg-accent\\/80,.hover\\:bg-accent\\/80:hover{background-color:hsl(var(--accent)/0.8)}
    .text-foreground{color:hsl(var(--foreground))}
    .text-primary-foreground{color:hsl(var(--primary-foreground))}
    .text-secondary-foreground{color:hsl(var(--secondary-foreground))}
    .text-destructive-foreground{color:hsl(var(--destructive-foreground))}
    .text-muted-foreground{color:hsl(var(--muted-foreground))}
    .text-accent-foreground{color:hsl(var(--accent-foreground))}
    .border-border{border-color:hsl(var(--border))}
    .border-input{border-color:hsl(var(--input))}
    .border-primary{border-color:hsl(var(--primary))}
    .border-secondary{border-color:hsl(var(--secondary))}
    .border-destructive{border-color:hsl(var(--destructive))}
    .ring-ring{--tw-ring-color:hsl(var(--ring))}
    .rounded-lg{border-radius:var(--radius)}
    .rounded-md{border-radius:calc(var(--radius) - 2px)}
    .rounded-sm{border-radius:calc(var(--radius) - 4px)}
  </style>
</head>
<body>
  <div id="root"></div>
  <pre id="err"></pre>
  <script type="module">
    const showErr = (e) => {
      const el = document.getElementById('err');
      el.style.display = 'block';
      el.textContent = String(e?.stack || e?.message || e);
    };

    try {
      if (!window.Babel) throw new Error('Babel standalone no cargó');

      // ── Load React (ONE instance shared by everything) ──────────────────────
      const reactMod  = await import('react');
      const rdAllMod  = await import('react-dom');
      const rdClient  = await import('react-dom/client');

      const R  = reactMod.default  || reactMod;   // the actual React object
      const RD = rdAllMod.default  || rdAllMod;

      // ── Eagerly load all extra deps through the importmap ───────────────────
      // They use ?external=react so they share the SAME React instance above
      const eagerKeys = ${eagerJson};
      const eagerMods = await Promise.all(eagerKeys.map(k => import(k).catch(() => ({}))));

      // ── Build module registry ───────────────────────────────────────────────
      const mods = {
        __esModule: true,
        'react':             { __esModule: true, ...R, default: R },
        'react/jsx-runtime': { __esModule: true, jsx: R.createElement, jsxs: R.createElement, Fragment: R.Fragment },
        'react-dom':         { __esModule: true, ...RD, default: RD },
        'react-dom/client':  { __esModule: true, ...rdClient },
      };
      eagerKeys.forEach((k, i) => { mods[k] = { __esModule: true, ...eagerMods[i] }; });

      // cn utility (replaces @/lib/utils)
      const clsxFn   = mods['clsx']?.clsx          || mods['clsx']?.default          || ((...c) => c.filter(Boolean).join(' '));
      const mergeFn  = mods['tailwind-merge']?.twMerge || mods['tailwind-merge']?.default || ((x) => x);
      mods['__UTILS__'] = { __esModule: true, cn: (...inputs) => mergeFn(clsxFn(inputs)) };

      // ── Babel CommonJS transformer ──────────────────────────────────────────
      const babelOpts = {
        presets: ['react', 'typescript'],
        plugins: ['transform-modules-commonjs'],
        filename: 'f.tsx',
      };
      const _process = { env: { NODE_ENV: 'production' } };

      function makeRequire(selfPath) {
        return function req(dep) {
          if (mods[dep] !== undefined) return mods[dep];
          if (dep.startsWith('.')) {
            const key = dep.replace(/\\.tsx?$/, '').replace(/^\\.\\//, '');
            if (mods[key] !== undefined) return mods[key];
            // Fallback: match by basename
            const base = key.split('/').pop();
            for (const k of Object.keys(mods)) {
              if (k.split('/').pop() === base) return mods[k];
            }
          }
          console.warn('[preview] module not found:', dep);
          return { __esModule: true };
        };
      }

      function runModule(name, source) {
        const js  = Babel.transform(source, { ...babelOpts, filename: name + '.tsx' }).code;
        const mod = { exports: {} };
        // eslint-disable-next-line no-new-func
        new Function('require', 'module', 'exports', 'React', 'process', js)(
          makeRequire(name), mod, mod.exports, R, _process
        );
        mods[name] = { __esModule: true, ...mod.exports };
        return mod.exports;
      }

      // ── Run component files ─────────────────────────────────────────────────
      const files = ${filesJson};
      for (const f of files) {
        try { runModule(f.path, f.content); }
        catch (e) { console.error('[preview] error in ' + f.path, e); }
      }

      // ── Run demo and render ─────────────────────────────────────────────────
      const demoExports = runModule('__demo__', ${demoJson});
      const Demo = demoExports.default;

      if (typeof Demo !== 'function') {
        throw new Error('El demo no tiene default export (got: ' + typeof Demo + ')');
      }

      rdClient.createRoot(document.getElementById('root')).render(R.createElement(Demo));

    } catch (e) {
      showErr(e);
    }
  <\/script>
</body>
</html>`;
}

export function SandpackPreviewPane({
  component,
  theme = 'dark',
  style,
}: {
  component: Component;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const wrapStyle: React.CSSProperties = style ?? { height: 400 };

  useEffect(() => {
    setLoading(true);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrcdoc(component, theme);
    }
  }, [component, theme]);

  return (
    <div style={wrapStyle} className="relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#09090b]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-white/30" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        onLoad={() => setLoading(false)}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
