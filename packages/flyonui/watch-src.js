import { watch } from 'fs'
import { readFileSync, writeFileSync } from 'fs'
import { exec } from 'child_process'
import path from 'path'

const colors = {
  cyan: (str) => `\x1b[36m${str}\x1b[0m`,
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  yellow: (str) => `\x1b[33m${str}\x1b[0m`,
}

console.log(colors.cyan('🔍 Watching for CSS changes in src/...'))

// Generar archivo con rutas absolutas
function generateFlyonuiSrc() {
  const indexContent = readFileSync('src/index.css', 'utf-8')
  
  // Reemplazar imports relativos con rutas absolutas
  const updatedContent = indexContent
    .replace(/@import "\.\/base\//g, '@import "../../../packages/flyonui/src/base/')
    .replace(/@import "\.\/components\//g, '@import "../../../packages/flyonui/src/components/')
    .replace(/@import "\.\/themes\//g, '@import "../../../packages/flyonui/src/themes/')
    .replace(/@import "\.\/utilities\//g, '@import "../../../packages/flyonui/src/utilities/')
    .replace(/@import "\.\/vendor\//g, '@import "../../../packages/flyonui/src/vendor/')
    .replace(/@import "\.\/js\/plugins\//g, '@import "../../../packages/flyonui/src/js/plugins/')
  
  const apps = [
    '../../apps/test-css/app/_flyonui-src.css',
    '../../apps/ui/app/_flyonui-src.css',
  ]
  
  apps.forEach(dest => {
    try {
      writeFileSync(dest, updatedContent)
      // Touch globals.css para forzar rebuild
      const globalsPath = dest.replace('_flyonui-src.css', 'globals.css')
      exec(`touch ${globalsPath}`)
      console.log(colors.green(`  ✓ Generated ${dest}`))
    } catch (e) {
      // Ignorar si no existe la app
    }
  })
}

// Debounce
let timeout

//  Carpetas a observar
const watchDirs = ['src/base', 'src/components', 'src/utilities', 'src/themes']

watchDirs.forEach((dir) => {
  try {
    watch(dir, { recursive: true }, (event, filename) => {
      if (!filename || !filename.endsWith('.css')) return
      
      if (timeout) clearTimeout(timeout)
      
      timeout = setTimeout(() => {
        console.log(colors.cyan(`\n📝 Change detected: ${path.join(dir, filename)}`))
        generateFlyonuiSrc()
      }, 200)
    })
    console.log(colors.green(`  ✓ Watching ${dir}/`))
  } catch (e) {
    console.log(colors.yellow(`  ⚠ Directory not found: ${dir}/`))
  }
})

// También observar cambios en index.css directamente
try {
  watch('src/index.css', (event) => {
    if (event === 'change') {
      console.log(colors.cyan('\n📝 index.css changed'))
      generateFlyonuiSrc()
    }
  })
  console.log(colors.green('  ✓ Watching src/index.css'))
} catch (e) {}

// Generación inicial
console.log(colors.cyan('\n🚀 Initial generation...'))
generateFlyonuiSrc()
