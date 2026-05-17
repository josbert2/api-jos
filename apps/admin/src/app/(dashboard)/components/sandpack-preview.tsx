'use client';

import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react';
import { Component } from '@/lib/types';

// HTML del sandbox con Tailwind por CDN, para que las clases del componente rendericen.
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

const EMPTY_DEMO =
  'export default function Demo() {\n' +
  '  return <div className="p-8 text-sm text-neutral-500">Sin demo.</div>;\n' +
  '}';

// Reescribe el alias @/ a una ruta absoluta del sandbox y arma el file-map.
function build(component: Component) {
  const fix = (s: string) => s.replace(/@\//g, '/');
  const files: Record<string, string> = {
    '/public/index.html': INDEX_HTML,
    '/App.tsx': fix(component.demo?.trim() ? component.demo : EMPTY_DEMO),
  };
  for (const f of component.files) {
    const path = '/' + f.path.replace(/^\/?(src\/)?/, '');
    files[path] = fix(f.content);
  }
  const dependencies: Record<string, string> = {};
  for (const d of component.dependencies) dependencies[d] = 'latest';
  return { files, dependencies };
}

export function SandpackPreviewPane({ component }: { component: Component }) {
  const { files, dependencies } = build(component);
  return (
    <SandpackProvider
      template="react-ts"
      theme="light"
      files={files}
      customSetup={{ dependencies }}
    >
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton
        style={{ height: 400 }}
      />
    </SandpackProvider>
  );
}
