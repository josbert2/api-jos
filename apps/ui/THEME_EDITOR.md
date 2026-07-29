# 🎨 Theme Editor - Panel Visual de Variables CSS

## ✨ ¿Qué es?

Un panel interactivo flotante que te permite **modificar todas las variables CSS de diseño en tiempo real** y ver los cambios inmediatamente en toda la aplicación.

## 🎯 Características

- ✅ **Sliders interactivos** para todas las variables de diseño
- ✅ **Vista previa en tiempo real** - Los cambios se aplican automáticamente
- ✅ **Copia fácil del CSS** - Un click para copiar el código generado
- ✅ **Reset rápido** - Vuelve a los valores por defecto
- ✅ **Diseño premium** - UI moderna con gradientes y animaciones
- ✅ **Organizado por secciones** - Border Radius, Sizes, Effects

## 📦 Variables disponibles

### Border Radius
- `--radius-field` - Radio de campos de entrada (0-2rem)
- `--radius-box` - Radio de cajas/contenedores (0-3rem)
- `--radius-selector` - Radio de selectores (0-3rem)

### Sizes
- `--size-field` - Tamaño base de campos (0.1-1rem)
- `--size-selector` - Tamaño base de selectores (0.1-1rem)

### Effects
- `--border` - Grosor del borde (0-5px)
- `--depth` - Profundidad de sombras (0-5)
- `--noise` - Intensidad del efecto de ruido (0-1)

## 🚀 Cómo usar

### 1. Abrir el editor
Haz click en el botón flotante **"Theme Editor"** en la esquina inferior derecha (gradiente púrpura/azul).

### 2. Modificar variables
Usa los sliders para ajustar cada variable:
- Mueve el slider para cambiar el valor
- Los cambios se aplican **instantáneamente**
- El valor actual se muestra en tiempo real

### 3. Ver el resultado
Todos los componentes de la aplicación se actualizan automáticamente con los nuevos valores.

### 4. Copiar CSS
Click en **"Copy CSS"** para copiar el código `@theme` con todos tus valores personalizados:

```css
@theme {
  --radius-field: 0.5rem;
  --radius-box: 1rem;
  --radius-selector: 1.5rem;
  --size-field: 0.3rem;
  --size-selector: 0.3rem;
  --border: 2px;
  --depth: 2;
  --noise: 0.1;
}
```

### 5. Aplicar en tu proyecto
Pega el CSS copiado en tu archivo `globals.css` dentro del bloque `@theme`.

## 💡 Casos de uso

### Diseño de UI
```
1. Abre el Theme Editor
2. Ajusta --radius-field a 0rem para un look angular
3. Aumenta --depth a 3 para más profundidad
4. Copia el CSS y úsalo en producción
```

### Prototipado rápido
```
1. Prueba diferentes valores rápidamente
2. Ve cómo se ven en componentes reales
3. Encuentra el diseño perfecto
4. Exporta y documenta
```

### Comparación de estilos
```
1. Guarda una captura de pantalla
2. Cambia valores
3. Compara resultados
4. Decide cuál funciona mejor
```

## 🎨 Ejemplo de uso

```tsx
// El componente ya está integrado en layout.tsx
// Simplemente navega a cualquier página y verás el botón flotante

// Para usarlo en otra app de Next.js:
import { ThemeEditor } from '@/components/ThemeEditor'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ThemeEditor />
      </body>
    </html>
  )
}
```

## 🔧 Personalización

Puedes agregar más variables editando el array `themeVariables` en `ThemeEditor.tsx`:

```typescript
const themeVariables: ThemeVariable[] = [
  // ...variables existentes
  { 
    name: 'Tu Variable', 
    cssVar: '--tu-variable', 
    type: 'range', 
    min: 0, 
    max: 10, 
    step: 0.1, 
    unit: 'rem', 
    defaultValue: '1rem' 
  },
]
```

## ⌨️ Atajos

- **Click en el botón flotante** - Abre/cierra el panel
- **Botón X** - Cierra el panel
- **Copy CSS** - Copia configuración actual
- **Reset** - Vuelve a valores por defecto

## 🎭 Estados visuales

- **Sliders con colores** - Púrpura para radius, Azul para sizes, Verde para effects
- **Valores en tiempo real** - Se muestran en badges monoespaciados
- **Feedback de copia** - Checkmark verde cuando se copia

## 📱 Responsive

El panel es fijo en desktop (396px de ancho). En mobile, ocupa el ancho completo de la pantalla.

---

**¡Ahora puedes diseñar visualmente tu tema sin tocar código!** 🎨✨
