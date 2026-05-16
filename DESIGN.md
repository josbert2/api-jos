---
name: api-jos Admin
description: Panel de administracion del portfolio josbert.dev. Tecnico, preciso, sobrio.
colors:
  ink: "oklch(0.21 0.012 264)"
  paper: "oklch(0.98 0.003 264)"
  surface: "oklch(0.995 0.001 264)"
  mute: "oklch(0.96 0.004 264)"
  mute-ink: "oklch(0.5 0.014 264)"
  line: "oklch(0.91 0.005 264)"
  signal: "oklch(0.55 0.13 215)"
  action: "oklch(0.24 0.013 264)"
  ok: "oklch(0.6 0.13 155)"
  warn: "oklch(0.72 0.15 78)"
  danger: "oklch(0.55 0.19 25)"
typography:
  title:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.09em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.01em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "oklch(0.31 0.013 264)"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 14px"
  input-focus:
    backgroundColor: "{colors.surface}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "12px"
    padding: "24px"
---

# Design System: api-jos Admin

## 1. Overview

**Creative North Star: "El instrumento de precision"**

Esto es la herramienta de un developer para administrar su portfolio, no un producto que se vende a nadie. Un solo usuario experto, sesiones cortas, una tarea por pantalla. El sistema esta del lado de la tarea: superficie clara, jerarquia neta, cero adorno. Confianza por exactitud, como un calibre o un editor de codigo, no por calidez.

Es tema claro, registro `product`. Neutros tintados en frio (hue 264), un unico acento cian (hue 215) que aparece poco y siempre con significado. Lineas finas antes que sombras, espacio antes que cajas. La referencia mental son Linear y Vercel: la interfaz desaparece y queda la tarea.

Rechaza explicitamente: el card flotante generico de shadcn (border + shadow-sm + max-w-sm centrado), el look corporativo sin alma (azul marino, stock, enterprise) y el SaaS decorativo (gradientes pastel, glassmorphism, hero-metric, blur por estetica).

**Key Characteristics:**
- Tema claro, neutros frios tintados, un solo acento cian.
- Plano por defecto: definicion por linea de 1px, no por sombra.
- Densidad y precision sobre decoracion; un detalle de craft por pantalla.
- Tipografia de sistema; mono solo para identidad y datos.

## 2. Colors

Paleta restringida: neutros frios casi-monocromos mas un unico acento cromatico.

### Primary
- **Cian Senal** (`oklch(0.55 0.13 215)`): el unico color del sistema. Anillos de foco, accion en curso, el glifo del logomark, indicadores de estado. Nunca como relleno decorativo.

### Neutral
- **Tinta** (`oklch(0.21 0.012 264)`): texto principal, encabezados. No es negro puro.
- **Papel** (`oklch(0.98 0.003 264)`): fondo de pagina.
- **Superficie** (`oklch(0.995 0.001 264)`): relleno de cards, inputs y paneles; un punto mas claro que el papel.
- **Tinta Tenue** (`oklch(0.5 0.014 264)`): texto secundario, labels, metadatos.
- **Linea** (`oklch(0.91 0.005 264)`): bordes y divisores; el material de construccion del sistema.
- **Accion** (`oklch(0.24 0.013 264)`): casi-negro de los botones primarios y el logomark.

### Semantic
- **OK** (`oklch(0.6 0.13 155)`): exito, confirmaciones.
- **Aviso** (`oklch(0.72 0.15 78)`): advertencias.
- **Peligro** (`oklch(0.55 0.19 25)`): errores, acciones destructivas.

### Named Rules
**La Regla de Una Voz.** El cian se usa en menos del 10% de cualquier pantalla. Su rareza es lo que lo hace legible. Si hay cian en dos lugares decorativos, uno sobra.

**La Regla del Neutro Tintado.** Ningun gris es gris puro y ningun blanco es `#fff`. Todo neutro lleva una pizca de cian (chroma 0.003-0.014). Prohibido `#000` y `#fff`.

## 3. Typography

**Body Font:** Sans del sistema (`system-ui, -apple-system, "Segoe UI", sans-serif`)
**Label/Mono Font:** Monoespaciada del sistema (`ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** Sin fuente de marca. La sans del sistema carga al instante, se ve nativa y es la decision correcta para una herramienta donde rendimiento supera a personalidad. La mono aparece solo donde refuerza el caracter tecnico: el wordmark y los datos.

### Hierarchy
- **Title** (600, 1.4rem, line-height 1.2, tracking -0.015em): titulo de pantalla. Uno por vista.
- **Body** (400, 0.875rem, line-height 1.5): texto, valores, contenido de tabla. Medida 65-75ch en prosa.
- **Label** (500, 0.7rem, tracking 0.09em, MAYUSCULAS): etiquetas de campo y encabezados de seccion.
- **Mono** (400, 0.8rem, tracking -0.01em): wordmark, IDs, rutas, datos tecnicos.

### Named Rules
**La Regla de la Escala Corta.** Razon de escala ajustada (~1.2). Es product UI: muchos elementos de texto, contraste exagerado solo genera ruido. Jerarquia por peso y espacio antes que por tamano.

## 4. Elevation

Plano por defecto. La profundidad viene de la linea de 1px y de la diferencia entre papel y superficie, no de la sombra. Una pantalla en reposo no proyecta sombra.

La sombra es la respuesta a una capa que realmente flota sobre el contenido: dropdowns, dialogs, toasts, popovers. Ahi es suave y difusa, nunca un borde duro y oscuro.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 8px 28px -8px oklch(0.21 0.012 264 / 0.18)`): menus, dialogs, toasts. El unico nivel de sombra del sistema.

### Named Rules
**La Regla del Plano por Defecto.** Las superficies son planas en reposo. La sombra aparece solo cuando un elemento esta de verdad en una capa superior. Una card con sombra en reposo es un error.

## 5. Components

### Buttons
- **Shape:** esquinas suaves (8px, `rounded-lg`). Altura 44px (touch target).
- **Primary:** fondo Accion casi-negro, texto Papel. Hover aclara levemente (`primary/90`); active comprime con `scale(0.99)`.
- **Hover / Focus:** transiciones de 150ms. Foco siempre visible: anillo de 2px en Cian Senal con offset de 2px sobre el fondo.
- **Secondary / Ghost:** ghost = sin fondo, hover con relleno Mute; outline = borde Linea sobre Superficie.

### Cards / Containers
- **Corner Style:** 12px (`rounded-xl`).
- **Background:** Superficie.
- **Shadow Strategy:** ninguna en reposo (ver Elevation).
- **Border:** 1px Linea. La card se define por el borde, no por la sombra.
- **Internal Padding:** 24px (`spacing.lg`).

### Inputs / Fields
- **Style:** relleno Superficie, borde 1px Linea, 8px de radio, alto 44px. Label MAYUSCULAS encima, nunca placeholder como label.
- **Focus:** el borde pasa a Cian Senal y aparece anillo de 2px Cian con offset. Caret en Cian.
- **Error:** borde Peligro. El mensaje va en un panel inline con `danger/7` de fondo y texto Peligro, nunca en toast.

### Navigation
- **Style:** nav lateral sobre Superficie, items con label Body. Default texto Tinta Tenue; hover relleno Mute; activo relleno Mute con texto Tinta y peso 500. Mobile: colapsa a drawer.

### Logomark
Cuadrado Accion casi-negro de 36px, radio 8px, con el glifo de terminal en Cian Senal. Junto al wordmark `josbert.dev/admin` en mono. Es la unica identidad de marca del sistema.

## 6. Do's and Don'ts

### Do:
- **Do** usar tokens semanticos (`bg-primary`, `text-muted-foreground`, `border-border`), nunca color crudo de Tailwind ni hex sueltos.
- **Do** definir las superficies con borde de 1px Linea y dejarlas planas en reposo.
- **Do** mantener el cian bajo el 10% de la pantalla y siempre con significado (foco, estado, accion).
- **Do** dar a cada control sus estados: default, hover, focus-visible, active, disabled, loading, error.
- **Do** respetar `prefers-reduced-motion` y mantener las transiciones en 150-250ms.

### Don't:
- **Don't** usar el card flotante generico de shadcn (`border + shadow-sm + max-w-sm` centrado). Es plantilla, no producto.
- **Don't** caer en lo corporativo sin alma: azul marino, fotos stock, layout enterprise.
- **Don't** decorar con gradientes pastel, glassmorphism, hero-metric ni blur por estetica.
- **Don't** usar `#000`, `#fff` ni grises de chroma 0.
- **Don't** poner sombra a una card en reposo; la sombra es solo para capas que flotan (overlay).
- **Don't** usar em dashes en el copy.
