# admin-jos — Documentación técnica

> Portfolio + registry de componentes. Monorepo pnpm con dos apps (`api`, `admin`) y un CLI (`@josbert/ui`).

---

## Stack

| Capa | Tecnología |
|---|---|
| API | NestJS 10 + Drizzle ORM + MySQL 8 |
| Admin | Next.js 15 App Router + Tailwind + shadcn |
| CLI | TypeScript ESM + Commander + Ora + Chalk |
| Preview | iframe srcdoc + Babel standalone + importmap ESM |

Puertos locales: **API :4001 · Admin :5737 · MySQL :3312**

---

## Arquitectura del registry

### Endpoint público

```
GET /r/:author/:name
```

Devuelve el componente en formato shadcn registry JSON (compatible con `npx shadcn@latest add <url>`).

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "chip",
  "type": "registry:component",
  "dependencies": ["class-variance-authority", "lucide-react"],
  "registryDependencies": [],
  "files": [{ "path": "...", "content": "...", "type": "registry:component" }]
}
```

### Endpoint de perfil público

```
GET /api/users/:username
```

Devuelve el perfil con todos sus componentes publicados.

---

## Sistema de preview (sandpack-preview.tsx)

El preview renderiza componentes React/TypeScript en un `<iframe srcdoc>` sin depender de servidores cloud (el antiguo Sandpack usaba `col.csbops.io` que puede estar inaccesible).

### Flujo de ejecución

```
1. buildSrcdoc(component, theme)
   │
   ├─ importmap → mapea 'react', 'lucide-react', etc. a esm.sh
   │   (lucide-react y similares usan ?external=react,react-dom
   │    para compartir la MISMA instancia de React)
   │
   ├─ <script src="@babel/standalone"> carga Babel UMD (sync)
   │
   └─ <script type="module"> async:
       │
       ├─ import('react') + import('react-dom/client')
       │   → UNA sola instancia de React compartida
       │
       ├─ Carga deps externos (cva, lucide, clsx, etc.)
       │   mediante Promise.all(eagerKeys.map(k => import(k)))
       │
       ├─ Construye el módulo registry (mods{})
       │   con __esModule: true en cada entrada para
       │   que _interopRequireWildcard funcione correctamente
       │
       ├─ Transforma cada archivo del componente con Babel:
       │   presets: ['react', 'typescript']
       │   plugins: ['transform-modules-commonjs']
       │   → CommonJS puro, sin blob URLs
       │
       ├─ Ejecuta con new Function(require, module, exports, React, process)
       │   require() custom resuelve: nombres exactos, rutas relativas, basename
       │
       ├─ Transforma y ejecuta el demo igual
       │
       └─ createRoot(root).render(createElement(Demo))
```

### Alias manejados

| Alias en código | Resuelve a |
|---|---|
| `@/lib/utils` | `__UTILS__` → `{ cn: (...) => twMerge(clsx(inputs)) }` |
| `@/` | `./` (ruta relativa) |

### Por qué no Sandpack

Sandpack necesita el bundler cloud de CodeSandbox (`col.csbops.io`) para compilar TypeScript + React. Si esa URL está bloqueada o tiene latencia, el preview queda negro indefinidamente. El enfoque con `@babel/standalone` + importmap funciona 100% en el browser sin dependencias externas de compilación.

### Por qué importmap con `?external=react`

Sin `?external=react`, esm.sh bundlea React dentro de cada paquete que lo usa como peer dep. Esto genera **dos instancias de React** en el mismo árbol:
- Una del `import('react')` del módulo script
- Otra embebida dentro de `lucide-react`, `framer-motion`, etc.

React error #31 ("Objects are not valid as a React child") es la consecuencia típica. Con `?external=react`, esm.sh marca React como externo y el browser lo resuelve desde el importmap — todos comparten la misma instancia.

---

## CLI (`@josbert/ui`)

### Instalación local

```bash
cd apps/cli && pnpm build
node dist/cli.js --help
```

### Comandos

```bash
# Listar componentes disponibles
josbert list
josbert list --user otroUsuario

# Agregar un componente (usa shadcn internamente)
josbert add chip
josbert add josbert/chip

# Para dev local
JOSBERT_API=http://localhost:4001 JOSBERT_REGISTRY=http://localhost:4001/r josbert list

# Eliminar un componente y sus archivos
josbert remove chip
josbert remove chip --dry-run
```

### Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `JOSBERT_API` | `https://api.josbert.dev` | URL base de la API (se agrega `/api` automáticamente) |
| `JOSBERT_REGISTRY` | `https://api.josbert.dev/r` | URL base del registry |
| `JOSBERT_AUTHOR` | `josbert` | Autor por defecto |

### Manifest (`josbert-registry.json`)

El CLI guarda un manifest en el directorio del proyecto con cada componente instalado:

```json
[
  {
    "name": "chip",
    "author": "josbert",
    "sourceUrl": "https://api.josbert.dev/r/josbert/chip",
    "registryItem": { ... },
    "addedAt": "2026-05-17T..."
  }
]
```

El comando `remove` lee este manifest para saber qué archivos borrar.

---

## Páginas públicas

| Ruta | Descripción |
|---|---|
| `/:username` | Perfil público con grid de componentes |
| `/:username/:name` | Detalle del componente: preview + código + instalación |

El detalle usa `SandpackPreviewPane` con `theme="dark"` por defecto.

---

## Importar componentes de terceros (ej: 21st.dev)

```javascript
// apps/cli o script ad-hoc
const reg = await fetch('https://21st.dev/r/author/component-name').then(r => r.json());

await fetch('http://localhost:4001/api/components', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: reg.name,
    title: reg.title ?? reg.name,
    type: reg.type,
    dependencies: reg.dependencies ?? [],
    registryDependencies: reg.registryDependencies ?? [],
    files: reg.files.map(f => ({ path: f.path.replace(/^\/?(src\/)?/, ''), content: f.content, type: f.type })),
    demo: '...', // escribir manualmente
    tags: [],
    isPublished: true,
  }),
});
```

---

## Convenciones de código

- Tokens semánticos Tailwind, nunca colores raw (`bg-emerald-500`, `bg-blue-700`, etc.)
- Cards: `rounded-3xl border border-border`
- Dark mode: clase `dark` en `<html>`, tokens OKLCH en `globals.css`
- Fuente: `ABC Diatype, system-ui, -apple-system, sans-serif`
- Color texto principal: `hsl(240 4.8% 95.9%)`
- Color subtítulos: `hsl(0 0% 52.9%)`

---

## Dev local

```bash
# Levantar todo
pnpm dev

# Solo API
pnpm dev:api

# Solo admin
pnpm dev:admin

# Base de datos
pnpm db:up        # Docker MySQL
pnpm db:generate  # Generar migraciones Drizzle
pnpm db:migrate   # Aplicar migraciones
pnpm db:seed      # Seed inicial (crea usuario admin)
```

Credenciales del seed: `hola@bookforce.io` / `changeme`
