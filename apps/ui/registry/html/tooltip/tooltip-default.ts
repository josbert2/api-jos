export default {
  description: "Default tooltip",
  html: `<div class="tooltip relative">
  <button class="btn btn-soft">Hover me</button>
  <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
    <div class="tooltip-body">Hi! I'm a tooltip.</div>
  </div>
</div>`,
  name: "tooltip-default",
};
