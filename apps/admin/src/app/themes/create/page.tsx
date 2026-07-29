'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  Copy01Icon,
  Tick01Icon,
  ShuffleIcon,
  Menu01Icon,
} from '@hugeicons/core-free-icons';
import { BUILTIN_THEMES } from '@/app/(dashboard)/components/themes-data';
import { cn } from '@/lib/utils';

/* ── color utils ─────────────────────────────────────────────────── */

function hslToHex(hsl: string): string {
  const parts = hsl.trim().replace(/%/g, '').split(/\s+/);
  if (parts.length < 3) return '#808080';
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

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(l * 100)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/* ── iframe doc ──────────────────────────────────────────────────── */

function buildDoc(vars: Record<string, string>, font: string): string {
  const v = (k: string, fb: string) => `hsl(${vars[k] ?? fb})`;
  const bg  = v('--background', '0 0% 9%');
  const fg  = v('--foreground', '0 0% 90%');
  const pr  = v('--primary', '0 0% 98%');
  const pfg = v('--primary-foreground', '0 0% 4%');
  const cd  = v('--card', '0 0% 15%');
  const bo  = v('--border', '0 0% 25%');
  const mu  = v('--muted', '0 0% 15%');
  const mfg = v('--muted-foreground', '0 0% 63%');
  const se  = v('--secondary', '0 0% 15%');
  const sfg = v('--secondary-foreground', '0 0% 90%');
  const ac  = v('--accent', '0 0% 15%');
  const afg = v('--accent-foreground', '0 0% 90%');
  const r   = vars['--radius'] ?? '0.5rem';

  const bars = ['Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => {
    const p = [40,65,50,80,60,90][i];
    return `<div class="row"><span class="lbl w28">${d}</span><div class="bar-bg"><div class="bar-fill" style="width:${p}%"></div></div><span class="lbl w28 tr">${p}%</span></div>`;
  }).join('');

  const acts = [['Deploy #42','2m ago','done'],['Build #139','18m ago','ok'],['PR #87','1h ago','merged'],['Tests','2h ago','pass']]
    .map(([t,ts,b]) => `<div class="row jcsb"><div><div class="sm fw5">${t}</div><div class="lbl">${ts}</div></div><span class="bdg">${b}</span></div>`).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${bg};color:${fg};font-family:'${font}',system-ui,sans-serif;font-size:13px;line-height:1.5;padding:24px}
.card{background:${cd};border:1px solid ${bo};border-radius:${r};padding:16px}
.lbl{color:${mfg};font-size:10px}.sm{font-size:11px}.fw5{font-weight:500}
.val{font-size:20px;font-weight:700;letter-spacing:-.02em}
.delta{color:${mfg};font-size:10px;margin-top:2px}
.btn-p{background:${pr};color:${pfg};border:none;padding:6px 14px;border-radius:${r};font-size:11px;font-weight:500;cursor:pointer;font-family:inherit}
.btn-o{background:transparent;color:${fg};border:1px solid ${bo};padding:6px 14px;border-radius:${r};font-size:11px;font-weight:500;cursor:pointer;font-family:inherit}
.btn-s{background:${se};color:${sfg};border:none;padding:6px 14px;border-radius:${r};font-size:11px;font-weight:500;cursor:pointer;font-family:inherit}
.bdg{background:${ac};color:${afg};padding:2px 8px;border-radius:99px;font-size:10px;display:inline-block}
.input{background:${mu};border:1px solid ${bo};color:${fg};padding:6px 10px;border-radius:${r};font-size:11px;width:100%;outline:none;font-family:inherit}
.divider{height:1px;background:${bo};margin:12px 0}
.row{display:flex;gap:8px;align-items:center}.jcsb{justify-content:space-between}
.bar-bg{background:${mu};height:5px;border-radius:99px;flex:1;overflow:hidden}
.bar-fill{height:100%;border-radius:99px;background:${pr}}
.w28{width:28px;flex-shrink:0}.tr{text-align:right}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.nav{color:${mfg};font-size:11px;padding:4px 10px;border-radius:${r}}
.nav.on{background:${mu};color:${fg};font-weight:500}
h4{font-size:11px;font-weight:600;margin-bottom:10px;color:${fg}}
.cap{text-transform:uppercase;font-size:9px;letter-spacing:.06em;color:${mfg};font-weight:600}
</style>
<script>
(function(){
  function apply(d){
    var s=document.getElementById('__t__');
    if(!s){s=document.createElement('style');s.id='__t__';document.head.appendChild(s);}
    var vs=d.vars,r=vs['--radius']||'0.5rem';
    var bg='hsl('+(vs['--background']||'0 0% 9%')+')';
    var fg='hsl('+(vs['--foreground']||'0 0% 90%')+')';
    var pr='hsl('+(vs['--primary']||'0 0% 98%')+')';
    var pfg='hsl('+(vs['--primary-foreground']||'0 0% 4%')+')';
    var cd='hsl('+(vs['--card']||'0 0% 15%')+')';
    var bo='hsl('+(vs['--border']||'0 0% 25%')+')';
    var mu='hsl('+(vs['--muted']||'0 0% 15%')+')';
    var mfg='hsl('+(vs['--muted-foreground']||'0 0% 63%')+')';
    var se='hsl('+(vs['--secondary']||'0 0% 15%')+')';
    var sfg='hsl('+(vs['--secondary-foreground']||'0 0% 90%')+')';
    var ac='hsl('+(vs['--accent']||'0 0% 15%')+')';
    var afg='hsl('+(vs['--accent-foreground']||'0 0% 90%')+')';
    document.body.style.background=bg;
    document.body.style.color=fg;
    if(d.font) document.body.style.fontFamily="'"+d.font+"',system-ui,sans-serif";
    s.textContent=[
      '.card{background:'+cd+';border-color:'+bo+';border-radius:'+r+'}',
      '.btn-p{background:'+pr+';color:'+pfg+';border-radius:'+r+'}',
      '.btn-o{color:'+fg+';border-color:'+bo+';border-radius:'+r+'}',
      '.btn-s{background:'+se+';color:'+sfg+';border-radius:'+r+'}',
      '.bdg{background:'+ac+';color:'+afg+'}',
      '.input{background:'+mu+';border-color:'+bo+';color:'+fg+';border-radius:'+r+'}',
      '.divider{background:'+bo+'}',
      '.bar-bg{background:'+mu+'}.bar-fill{background:'+pr+'}',
      '.lbl{color:'+mfg+'}.delta{color:'+mfg+'}.cap{color:'+mfg+'}',
      '.nav.on{background:'+mu+';color:'+fg+'}.nav{color:'+mfg+'}',
      '.nav{border-radius:'+r+'}',
    ].join('\n');
  }
  window.addEventListener('message',function(e){
    if(e.data&&e.data.type==='update-theme') apply(e.data);
  });
})();
</script>
</head>
<body>
<div class="hdr">
  <div class="row" style="gap:12px">
    <div style="width:22px;height:22px;background:${pr};border-radius:5px"></div>
    <nav class="row" style="gap:2px">
      <div class="nav on">Dashboard</div><div class="nav">Projects</div><div class="nav">Settings</div>
    </nav>
  </div>
  <div class="row" style="gap:6px">
    <button class="btn-o" style="padding:4px 10px">New</button>
    <button class="btn-p" style="padding:4px 10px">Deploy</button>
  </div>
</div>
<div class="g3" style="margin-bottom:12px">
  <div class="card"><div class="lbl cap">Revenue</div><div class="val">$15,231</div><div class="delta">+20.1% this month</div></div>
  <div class="card"><div class="lbl cap">Users</div><div class="val">2,350</div><div class="delta">+12.5% this month</div></div>
  <div class="card"><div class="lbl cap">Conversion</div><div class="val">3.24%</div><div class="delta">+1.2% this month</div></div>
</div>
<div class="g2" style="margin-bottom:12px">
  <div class="card"><h4>Analytics</h4><div style="display:flex;flex-direction:column;gap:8px">${bars}</div></div>
  <div class="card"><h4>Activity</h4><div style="display:flex;flex-direction:column;gap:8px">${acts}</div></div>
</div>
<div class="card">
  <h4>Quick Actions</h4>
  <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:10px">
    <button class="btn-p">Create project</button>
    <button class="btn-s">View reports</button>
    <button class="btn-o">Import</button>
  </div>
  <div class="divider"></div>
  <div class="g2" style="gap:8px;margin-top:10px">
    <input class="input" placeholder="Search components…"/>
    <input class="input" placeholder="Filter by tag…"/>
  </div>
</div>
</body></html>`;
}

/* ── constants ───────────────────────────────────────────────────── */

const FONTS = Array.from(new Set(BUILTIN_THEMES.map((t) => t.font))).sort();

const RADIUS_OPTIONS = [
  { label: 'None',    value: '0px',     preview: '0' },
  { label: 'Small',   value: '0.25rem', preview: 'sm' },
  { label: 'Default', value: '0.5rem',  preview: 'md' },
  { label: 'Medium',  value: '0.75rem', preview: 'lg' },
  { label: 'Large',   value: '1rem',    preview: 'xl' },
  { label: 'Full',    value: '1.5rem',  preview: '∞' },
];


const DEFAULT_THEME = BUILTIN_THEMES[0];

/* ── styles ──────────────────────────────────────────────────────── */
const ROW_BG  = 'rgb(20,20,20)';
const ROW_BORDER = 'rgb(30,30,30)';
const LABEL_COLOR = 'rgb(90,90,90)';
const VALUE_COLOR = 'rgb(230,230,230)';

/* ── option row ──────────────────────────────────────────────────── */

function OptionRow({
  label,
  value,
  right,
  onClick,
}: {
  label: string;
  value: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/5"
      style={{ background: ROW_BG, border: `1px solid ${ROW_BORDER}` }}
    >
      <div>
        <div className="text-[11px] font-[450] leading-none mb-1" style={{ color: LABEL_COLOR }}>
          {label}
        </div>
        <div className="text-[14px] font-[600] leading-none" style={{ color: VALUE_COLOR }}>
          {value}
        </div>
      </div>
      {right}
    </button>
  );
}


/* ── page ────────────────────────────────────────────────────────── */

export default function ThemeCreatorPage() {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [vars, setVars]             = useState<Record<string, string>>({ ...DEFAULT_THEME.vars });
  const [font, setFont]             = useState(DEFAULT_THEME.font);
  const [preset, setPreset]         = useState(DEFAULT_THEME.name);
  const [copied, setCopied]         = useState(false);
  const [activeSheet, setActiveSheet] = useState<'preset' | 'font' | 'radius' | null>(null);

  const [initialDoc] = useState(() => buildDoc(DEFAULT_THEME.vars, DEFAULT_THEME.font));

  const sync = useCallback((v: Record<string, string>, f: string) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'update-theme', vars: v, font: f }, '*');
  }, []);

  const updateVar = useCallback((key: string, value: string) => {
    setVars((prev) => {
      const next = { ...prev, [key]: value };
      sync(next, font);
      return next;
    });
  }, [font, sync]);

  const loadPreset = useCallback((theme: typeof BUILTIN_THEMES[0]) => {
    setVars({ ...theme.vars });
    setFont(theme.font);
    setPreset(theme.name);
    setActiveSheet(null);
    sync(theme.vars, theme.font);
  }, [sync]);

  const shuffle = useCallback(() => {
    const pool = BUILTIN_THEMES.filter((t) => t.name !== preset);
    loadPreset(pool[Math.floor(Math.random() * pool.length)]);
  }, [preset, loadPreset]);

  const copyCSS = useCallback(async () => {
    const css = `:root {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
    await navigator.clipboard?.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [vars]);

  const currentRadius = RADIUS_OPTIONS.find((r) => r.value === (vars['--radius'] ?? '0.5rem')) ?? RADIUS_OPTIONS[2];
  const primaryHex = hslToHex(vars['--primary'] ?? '0 0% 98%');

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'rgb(10,10,10)' }}>

      {/* ── Preview (left) ── */}
      <div className="flex flex-1 flex-col min-w-0 gap-4 p-4">
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/components/themes')}
            className="flex items-center gap-1.5 text-[13px] font-[450] transition-colors hover:text-white"
            style={{ color: 'rgb(92,92,92)' }}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            Themes
          </button>
          <span style={{ color: 'rgb(36,36,36)' }}>/</span>
          <span className="text-[13px] font-[450]" style={{ color: 'rgb(173,183,190)' }}>
            {preset}
          </span>
        </div>

        <div
          className="flex-1 overflow-hidden rounded-2xl border"
          style={{ borderColor: 'rgb(24,24,24)' }}
        >
          <iframe
            ref={iframeRef}
            title="theme-preview"
            sandbox="allow-scripts"
            srcDoc={initialDoc}
            onLoad={() => sync(vars, font)}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Customizer (right) ── */}
      <aside
        className="flex w-[260px] shrink-0 flex-col overflow-hidden"
        style={{ borderLeft: '1px solid rgb(20,20,20)', background: 'rgb(12,12,12)' }}
      >
        {/* header */}
        <div
          className="flex shrink-0 items-center justify-between px-4 py-4"
          style={{ borderBottom: '1px solid rgb(22,22,22)' }}
        >
          <span className="text-[15px] font-[600]" style={{ color: 'rgb(230,230,230)' }}>Menu</span>
          <HugeiconsIcon icon={Menu01Icon} size={18} style={{ color: 'rgb(130,130,130)' }} />
        </div>

        {/* rows */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">

          {/* Style / Preset */}
          <OptionRow
            label="Style"
            value={preset}
            right={
              <span
                className="h-7 w-7 shrink-0 rounded-lg border border-white/10"
                style={{ background: primaryHex, display: 'inline-block' }}
              />
            }
            onClick={() => setActiveSheet(activeSheet === 'preset' ? null : 'preset')}
          />

          {activeSheet === 'preset' && (
            <div
              className="overflow-hidden rounded-xl border py-1"
              style={{ background: 'rgb(16,16,16)', borderColor: ROW_BORDER, maxHeight: '240px', overflowY: 'auto' }}
            >
              {BUILTIN_THEMES.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => loadPreset(t)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-[450] transition-colors hover:bg-white/5 text-left"
                  style={{ color: t.name === preset ? 'rgb(248,248,248)' : 'rgb(130,130,130)' }}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border border-white/10"
                    style={{ background: hslToHex(t.vars['--primary'] ?? '0 0% 50%') }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          )}

          <div style={{ height: 1, background: 'rgb(22,22,22)', margin: '4px 0' }} />

          <ColorOptionRow
            label="Base Color"
            value={hslToHex(vars['--primary'] ?? '0 0% 98%').toUpperCase()}
            hex={hslToHex(vars['--primary'] ?? '0 0% 98%')}
            onChange={(h) => updateVar('--primary', hexToHsl(h))}
          />

          <ColorOptionRow
            label="Theme"
            value={hslToHex(vars['--background'] ?? '0 0% 9%').toUpperCase()}
            hex={hslToHex(vars['--background'] ?? '0 0% 9%')}
            onChange={(h) => updateVar('--background', hexToHsl(h))}
          />

          <ColorOptionRow
            label="Accent"
            value={hslToHex(vars['--accent'] ?? '0 0% 15%').toUpperCase()}
            hex={hslToHex(vars['--accent'] ?? '0 0% 15%')}
            onChange={(h) => updateVar('--accent', hexToHsl(h))}
          />

          <div style={{ height: 1, background: 'rgb(22,22,22)', margin: '4px 0' }} />

          {/* Font */}
          <OptionRow
            label="Font"
            value={font}
            right={
              <span className="text-[16px] font-[500]" style={{ color: 'rgb(130,130,130)', fontFamily: font }}>
                Aa
              </span>
            }
            onClick={() => setActiveSheet(activeSheet === 'font' ? null : 'font')}
          />

          {activeSheet === 'font' && (
            <div
              className="overflow-hidden rounded-xl border py-1"
              style={{ background: 'rgb(16,16,16)', borderColor: ROW_BORDER, maxHeight: '200px', overflowY: 'auto' }}
            >
              {FONTS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setFont(f); sync(vars, f); setActiveSheet(null); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-[13px] font-[450] transition-colors hover:bg-white/5 text-left"
                  style={{ color: f === font ? 'rgb(248,248,248)' : 'rgb(130,130,130)' }}
                >
                  <span style={{ fontFamily: f }}>{f}</span>
                  <span className="text-[13px]" style={{ fontFamily: f, color: 'rgb(72,72,72)' }}>Aa</span>
                </button>
              ))}
            </div>
          )}

          <div style={{ height: 1, background: 'rgb(22,22,22)', margin: '4px 0' }} />

          {/* Radius */}
          <OptionRow
            label="Radius"
            value={currentRadius.label}
            right={
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4 18 L4 9 Q4 4 9 4 L18 4"
                  stroke="rgb(130,130,130)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            }
            onClick={() => setActiveSheet(activeSheet === 'radius' ? null : 'radius')}
          />

          {activeSheet === 'radius' && (
            <div
              className="overflow-hidden rounded-xl border py-1"
              style={{ background: 'rgb(16,16,16)', borderColor: ROW_BORDER }}
            >
              {RADIUS_OPTIONS.map((ro) => (
                <button
                  key={ro.value}
                  type="button"
                  onClick={() => { updateVar('--radius', ro.value); setActiveSheet(null); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-[13px] font-[450] transition-colors hover:bg-white/5 text-left"
                  style={{ color: currentRadius.value === ro.value ? 'rgb(248,248,248)' : 'rgb(130,130,130)' }}
                >
                  {ro.label}
                  <span
                    className="h-4 w-4 border border-current"
                    style={{ borderRadius: ro.value, display: 'inline-block' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── bottom actions ── */}
        <div
          className="shrink-0 px-3 py-3 space-y-2"
          style={{ borderTop: '1px solid rgb(22,22,22)' }}
        >
          <div
            className="flex items-center justify-center rounded-xl px-3 py-2 text-[12px] font-mono font-[500]"
            style={{ border: '1px solid rgb(28,28,28)', color: 'rgb(90,90,90)', background: ROW_BG }}
          >
            --preset {preset.toLowerCase().replace(/\s+/g, '-').slice(0, 12)}
          </div>

          <button
            type="button"
            onClick={shuffle}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-[500] transition-colors hover:bg-white/5"
            style={{ border: '1px solid rgb(32,32,32)', color: 'rgb(173,183,190)', background: ROW_BG }}
          >
            <HugeiconsIcon icon={ShuffleIcon} size={14} />
            Shuffle
          </button>

          <button
            type="button"
            onClick={copyCSS}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-[600] transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: copied ? 'rgb(0,178,122)' : 'rgb(235,235,235)',
              color: copied ? '#fff' : 'rgb(10,10,10)',
            }}
          >
            <HugeiconsIcon icon={copied ? Tick01Icon : Copy01Icon} size={14} />
            {copied ? 'Copiado!' : 'Get Code'}
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ── color option row (with hidden input) ────────────────────────── */

function ColorOptionRow({
  label,
  value,
  hex,
  onChange,
}: {
  label: string;
  value: string;
  hex: string;
  onChange: (hex: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/5"
      style={{ background: ROW_BG, border: `1px solid ${ROW_BORDER}` }}
    >
      <div>
        <div className="text-[11px] font-[450] leading-none mb-1" style={{ color: LABEL_COLOR }}>{label}</div>
        <div className="text-[14px] font-[600] leading-none" style={{ color: VALUE_COLOR }}>{value}</div>
      </div>
      <span
        className="h-6 w-6 shrink-0 rounded-full border border-white/10"
        style={{ background: hex, display: 'inline-block' }}
      />
      <input
        ref={ref}
        type="color"
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />
    </button>
  );
}

