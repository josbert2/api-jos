export default {
  description: "Tooltip positions",
  html: `<div class="grid grid-cols-2 gap-12 place-items-center">
  <div class="tooltip relative">
    <button class="btn btn-soft">Top</button>
    <div class="tooltip-content !visible !opacity-100" style="bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body">Top tooltip</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-soft">Right</button>
    <div class="tooltip-content !visible !opacity-100" style="left: calc(100% + 0.5rem); top: 50%; transform: translateY(-50%);">
      <div class="tooltip-body">Right tooltip</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-soft">Left</button>
    <div class="tooltip-content !visible !opacity-100" style="right: calc(100% + 0.5rem); top: 50%; transform: translateY(-50%);">
      <div class="tooltip-body">Left tooltip</div>
    </div>
  </div>
  <div class="tooltip relative">
    <button class="btn btn-soft">Bottom</button>
    <div class="tooltip-content !visible !opacity-100" style="top: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);">
      <div class="tooltip-body">Bottom tooltip</div>
    </div>
  </div>
</div>`,
  name: "tooltip-positions",
};
