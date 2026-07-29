'use client'

import { useState, useEffect } from 'react'
import { ThemePreview } from './ThemePreview'

interface ThemeVariable {
  name: string
  cssVar: string
  type: 'range' | 'color' | 'number'
  min?: number
  max?: number
  step?: number
  unit?: string
  defaultValue: string
}

const themeVariables: ThemeVariable[] = [
  // Border Radius
  { name: 'Field Radius', cssVar: '--radius-field', type: 'range', min: 0, max: 2, step: 0.05, unit: 'rem', defaultValue: '0.25rem' },
  { name: 'Box Radius', cssVar: '--radius-box', type: 'range', min: 0, max: 3, step: 0.1, unit: 'rem', defaultValue: '0.5rem' },
  { name: 'Selector Radius', cssVar: '--radius-selector', type: 'range', min: 0, max: 3, step: 0.1, unit: 'rem', defaultValue: '1rem' },
  
  // Sizes
  { name: 'Field Size', cssVar: '--size-field', type: 'range', min: 0.1, max: 1, step: 0.05, unit: 'rem', defaultValue: '0.25rem' },
  { name: 'Selector Size', cssVar: '--size-selector', type: 'range', min: 0.1, max: 1, step: 0.05, unit: 'rem', defaultValue: '0.25rem' },
  
  // Border
  { name: 'Border Width', cssVar: '--border', type: 'range', min: 0, max: 5, step: 1, unit: 'px', defaultValue: '1px' },
  
  // Effects
  { name: 'Depth', cssVar: '--depth', type: 'range', min: 0, max: 5, step: 0.1, unit: '', defaultValue: '1' },
  { name: 'Noise', cssVar: '--noise', type: 'range', min: 0, max: 1, step: 0.05, unit: '', defaultValue: '0' },
]

export function ThemeEditor() {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Leer valores iniciales del CSS
    const root = document.documentElement
    const initialValues: Record<string, string> = {}
    
    themeVariables.forEach(variable => {
      const value = getComputedStyle(root).getPropertyValue(variable.cssVar).trim()
      initialValues[variable.cssVar] = value || variable.defaultValue
    })
    
    setValues(initialValues)
  }, [])

  const handleChange = (cssVar: string, value: string, unit: string = '') => {
    const fullValue = unit ? `${value}${unit}` : value
    setValues(prev => ({ ...prev, [cssVar]: fullValue }))
    document.documentElement.style.setProperty(cssVar, fullValue)
  }

  const handleReset = () => {
    themeVariables.forEach(variable => {
      document.documentElement.style.setProperty(variable.cssVar, variable.defaultValue)
    })
    
    const resetValues: Record<string, string> = {}
    themeVariables.forEach(v => {
      resetValues[v.cssVar] = v.defaultValue
    })
    setValues(resetValues)
  }

  const copyToClipboard = () => {
    const cssCode = `@theme {
${themeVariables.map(v => `  ${v.cssVar}: ${values[v.cssVar] || v.defaultValue};`).join('\n')}
}`
    
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const parseValue = (fullValue: string): number => {
    return parseFloat(fullValue) || 0
  }

  if (!isOpen) {
    return (
    <></>
    )
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-blue-600">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Theme Editor
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Live Preview */}
        <ThemePreview />
        
        {/* Border Radius Section */}
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Border Radius</h3>
          <div className="space-y-4">
            {themeVariables.filter(v => v.cssVar.includes('radius')).map(variable => (
              <div key={variable.cssVar} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {variable.name}
                  </label>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {values[variable.cssVar] || variable.defaultValue}
                  </span>
                </div>
                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={parseValue(values[variable.cssVar] || variable.defaultValue)}
                  onChange={(e) => handleChange(variable.cssVar, e.target.value, variable.unit)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Sizes Section */}
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Sizes</h3>
          <div className="space-y-4">
            {themeVariables.filter(v => v.cssVar.includes('size')).map(variable => (
              <div key={variable.cssVar} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {variable.name}
                  </label>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {values[variable.cssVar] || variable.defaultValue}
                  </span>
                </div>
                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={parseValue(values[variable.cssVar] || variable.defaultValue)}
                  onChange={(e) => handleChange(variable.cssVar, e.target.value, variable.unit)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Effects Section */}
        <section>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Effects</h3>
          <div className="space-y-4">
            {themeVariables.filter(v => v.cssVar === '--border' || v.cssVar === '--depth' || v.cssVar === '--noise').map(variable => (
              <div key={variable.cssVar} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {variable.name}
                  </label>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {values[variable.cssVar] || variable.defaultValue}
                  </span>
                </div>
                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={parseValue(values[variable.cssVar] || variable.defaultValue)}
                  onChange={(e) => handleChange(variable.cssVar, e.target.value, variable.unit)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy CSS
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
