'use client'

export function ThemePreview() {
  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Live Preview
      </div>
      
      {/* Buttons Preview */}
      <div className="space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">Buttons</div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn-pill-blue">Pill Blue</button>
        </div>
      </div>

      {/* Inputs Preview */}
      <div className="space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">Inputs</div>
        <input 
          type="text" 
          placeholder="Text input..." 
          className="input input-bordered w-full"
        />
      </div>

      {/* Card Preview */}
      <div className="space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">Card</div>
        <div className="card bg-white dark:bg-gray-700 shadow-md p-4">
          <h3 className="font-semibold mb-1">Card Title</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This card updates with your theme changes.
          </p>
        </div>
      </div>

      {/* Badge Preview */}
      <div className="space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">Badges</div>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-accent">Accent</span>
        </div>
      </div>
    </div>
  )
}
