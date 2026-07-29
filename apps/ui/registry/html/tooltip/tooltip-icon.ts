export default {
  description: "Tooltip on an icon",
  html: `<div class="tooltip relative">
  <button class="btn btn-square btn-soft">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>
  </button>
  <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
    <div class="tooltip-body tooltip-info">More information</div>
  </div>
</div>`,
  name: "tooltip-icon",
};
