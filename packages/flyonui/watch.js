import { exec } from 'child_process'
import { watch } from 'fs'
import path from 'path'

const colors = {
  cyan: (str) => `\x1b[36m${str}\x1b[0m`,
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  yellow: (str) => `\x1b[33m${str}\x1b[0m`,
  red: (str) => `\x1b[31m${str}\x1b[0m`,
}

console.log(colors.cyan('🔍 Watching for CSS changes in src/...'))

function build() {
  const startTime = Date.now()

  exec('bun build.js', (err, stdout, stderr) => {
    const endTime = Date.now()

    if (err) {
      console.error(colors.red('Error:'), err.message)
      return
    }
    if (stderr.trim()) {
      console.error(colors.red('stderr:'), stderr)
    }
    if (stdout.trim()) {
      console.log(stdout)
    }

    // Copiar CSS a public de todas las apps para hot reload
    const apps = [
      { cssPath: '../../apps/ui/public/css/flyonui.css', versionPath: '../../apps/ui/public/flyonui-version.json' },
      { cssPath: '../../apps/test-css/public/flyonui.css', versionPath: '../../apps/test-css/public/flyonui-version.json' }
    ]
    
    const version = Date.now()
    let completed = 0
    
    apps.forEach(app => {
      const cssDir = app.cssPath.split('/').slice(0, -1).join('/')
      
      // Copiar CSS y crear archivo de versión en public
      exec(`mkdir -p ${cssDir} && cp flyonui.css ${app.cssPath} && echo '{"version":${version}}' > ${app.versionPath}`, (err) => {
        if (!err) {
          completed++
          if (completed === apps.length) {
            console.log(colors.green(`  ✓ CSS copied and versioned (v${version})`))
          }
        }
      })
    })

    console.log(
      colors.green('✓ Build complete ') +
      colors.yellow(`(${((endTime - startTime) / 1000).toFixed(2)}s)`)
    )
  })
}

// Debounce timeouts por archivo
const timeouts = {}

// Carpetas a observar
const watchDirs = [
  'src/base',
  'src/components',
  'src/utilities',
  'src/themes',
]

watchDirs.forEach((dir) => {
  try {
    watch(dir, { recursive: true }, (event, filename) => {
      if (!filename) return
      if (!filename.endsWith('.css')) return

      // Debounce
      if (timeouts[filename]) {
        clearTimeout(timeouts[filename])
      }

      timeouts[filename] = setTimeout(() => {
        delete timeouts[filename]
        console.log(colors.cyan(`\n📝 Change detected: ${path.join(dir, filename)}`))
        build()
      }, 200)
    })
    console.log(colors.green(`  ✓ Watching ${dir}/`))
  } catch (e) {
    console.log(colors.yellow(`  ⚠ Directory not found: ${dir}/`))
  }
})

// Build inicial
console.log(colors.cyan('\n🚀 Initial build...'))
build()
