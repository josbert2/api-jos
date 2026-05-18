'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { apiPost } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useStudioUser } from '../studio-context';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/ui/tag-input';

const TYPES = [
  'registry:component',
  'registry:ui',
  'registry:block',
  'registry:hook',
  'registry:lib',
];

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const COMPONENT_TEMPLATE = `import * as React from 'react'

interface MyComponentProps {
  children?: React.ReactNode
}

export function MyComponent({ children }: MyComponentProps) {
  return (
    <div className="p-4">
      {children ?? 'My Component'}
    </div>
  )
}
`;

const DEMO_TEMPLATE = `import { MyComponent } from './component'

export default function Demo() {
  return (
    <div className="p-8">
      <MyComponent />
    </div>
  )
}
`;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ContinueButton({
  onContinue,
}: {
  onContinue: (files: Record<string, string>) => void;
}) {
  const { sandpack } = useSandpack();

  return (
    <button
      type="button"
      onClick={() => {
        const snapshot: Record<string, string> = {};
        for (const [path, file] of Object.entries(sandpack.files)) {
          snapshot[path] = typeof file === 'string' ? file : file.code;
        }
        onContinue(snapshot);
      }}
      className={cn(
        'inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground',
        'outline-none transition-[background-color,transform] duration-150 hover:bg-primary/90 active:scale-[0.97]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      Continue
      <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
    </button>
  );
}

function InfoPreview({ files }: { files: Record<string, string> }) {
  const sandpackFiles = {
    '/public/index.html': INDEX_HTML,
    ...files,
  };
  return (
    <SandpackProvider template="react-ts" theme="dark" files={sandpackFiles}>
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton
        style={{ height: '100%' }}
      />
    </SandpackProvider>
  );
}

const selectClass =
  'h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none ' +
  'transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export default function NewComponentPage() {
  const router = useRouter();
  const user = useStudioUser();

  const [step, setStep] = useState<'edit' | 'info'>('edit');
  const [capturedFiles, setCapturedFiles] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('registry:component');
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [registryDependencies, setRegistryDependencies] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(v: string) {
    setTitle(v);
    const slug = slugify(v);
    setName(slug);
    setFilePath(`components/${slug}.tsx`);
  }

  function handleContinue(files: Record<string, string>) {
    setCapturedFiles(files);
    setStep('info');
  }

  async function handleSave(e: FormEvent, publish: boolean) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    const componentCode = capturedFiles['/component.tsx'] ?? '';
    const demoCode = capturedFiles['/App.tsx'] ?? '';
    try {
      await apiPost('/components', {
        name: name.trim(),
        title: title.trim(),
        description: description.trim() || undefined,
        type,
        dependencies,
        registryDependencies,
        files: [
          {
            path: filePath.trim() || `components/${name || 'component'}.tsx`,
            content: componentCode,
            type,
          },
        ],
        demo: demoCode.trim() || undefined,
        isPublished: publish,
      });
      router.push(`/studio/${user.username}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.');
      setSaving(false);
    }
  }

  /* ─── Step 1: Editor ─── */
  if (step === 'edit') {
    return (
      <SandpackProvider
        template="react-ts"
        theme="dark"
        files={{
          '/public/index.html': { code: INDEX_HTML, hidden: true },
          '/component.tsx': { code: COMPONENT_TEMPLATE, active: true },
          '/App.tsx': { code: DEMO_TEMPLATE },
        }}
      >
        <div
          style={{ height: 'calc(100vh - 44px)' }}
          className="flex flex-col bg-[#151515]"
        >
          {/* Top bar */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push(`/studio/${user.username}`)}
                className="grid h-7 w-7 place-items-center rounded-md text-white/50 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={15} />
              </button>
              <span className="text-xs text-white/30">/</span>
              <span className="text-xs font-medium text-white/70">New component</span>
            </div>
            <ContinueButton onContinue={handleContinue} />
          </div>

          {/* Sandpack panels */}
          <SandpackLayout
            style={{
              flex: 1,
              minHeight: 0,
              border: 'none',
              borderRadius: 0,
              '--sp-layout-height': '100%',
            } as React.CSSProperties}
          >
            <SandpackFileExplorer style={{ height: '100%', minWidth: '160px', maxWidth: '200px' }} />
            <SandpackCodeEditor
              style={{ height: '100%', flex: 1 }}
              showTabs
              showLineNumbers
              closableTabs
            />
            <SandpackPreview
              style={{ height: '100%', flex: 1 }}
              showOpenInCodeSandbox={false}
              showRefreshButton
            />
          </SandpackLayout>
        </div>
      </SandpackProvider>
    );
  }

  /* ─── Step 2: Info form ─── */
  return (
    <div style={{ height: 'calc(100vh - 44px)' }} className="flex flex-col">
      {/* Top bar */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <button
          type="button"
          onClick={() => setStep('edit')}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
          Edit code
        </button>
        <span className="text-xs font-medium text-foreground">New component</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            form="info-form"
            disabled={saving || !title.trim()}
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById('info-form') as HTMLFormElement | null;
              if (form?.checkValidity()) handleSave(e as unknown as FormEvent, false);
              else form?.reportValidity();
            }}
            className={cn(
              'inline-flex h-7 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground outline-none transition-colors hover:bg-muted',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            Guardar borrador
          </button>
          <button
            type="button"
            disabled={saving || !title.trim()}
            onClick={(e) => {
              const form = document.getElementById('info-form') as HTMLFormElement | null;
              if (form?.checkValidity()) handleSave(e as unknown as FormEvent, true);
              else form?.reportValidity();
            }}
            className={cn(
              'inline-flex h-7 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground outline-none transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.97]',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            {saving ? 'Guardando…' : 'Publicar'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form */}
        <div className="w-[360px] shrink-0 overflow-y-auto border-r border-border">
          <form id="info-form" className="flex flex-col gap-5 p-6">
            <Field label="Título" hint="El nombre que ven los usuarios">
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="My Button"
                required
                autoFocus
              />
            </Field>

            <Field label="Name (slug)" hint="Va en la URL: /r/autor/name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-button"
                required
              />
            </Field>

            <Field label="Ruta del archivo" hint="Dónde se instala en el proyecto destino">
              <Input
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="components/my-button.tsx"
              />
            </Field>

            <Field label="Descripción">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Un botón accesible con variantes…"
                rows={3}
              />
            </Field>

            <Field label="Tipo">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={selectClass}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Dependencies (npm)">
              <TagInput value={dependencies} onChange={setDependencies} placeholder="Enter…" />
            </Field>

            <Field label="Registry deps">
              <TagInput
                value={registryDependencies}
                onChange={setRegistryDependencies}
                placeholder="Enter…"
              />
            </Field>

            {error && <p className="text-xs text-destructive">{error}</p>}
          </form>
        </div>

        {/* Preview */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-9 shrink-0 items-center border-b border-border px-4">
            <span className="text-xs text-muted-foreground">Preview</span>
          </div>
          <div className="flex-1">
            {Object.keys(capturedFiles).length > 0 ? (
              <InfoPreview files={capturedFiles} />
            ) : (
              <div className="grid h-full place-items-center text-xs text-muted-foreground">
                Sin preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
