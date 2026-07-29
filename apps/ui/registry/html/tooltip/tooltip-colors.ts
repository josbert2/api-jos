export default {
  description: "Tooltip colors",
  html: `<div class="flex flex-wrap items-end gap-10">
  <div class="tooltip relative">
    <button class="btn btn-primary">Primary</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body tooltip-primary">Primary</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-info">Info</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body tooltip-info">Info</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-success">Success</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body tooltip-success">Success</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-warning">Warning</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body tooltip-warning">Warning</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-error">Error</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body tooltip-error">Error</div>
    </div>
  </div>
</div>`,
  name: "tooltip-colors",
};
