export default {
  description: "Indicator positions",
  html: `<div class="grid grid-cols-3 place-items-center gap-6">
  <div class="indicator">
    <span class="indicator-item indicator-top indicator-start badge badge-primary badge-sm">TS</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">top start</div>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-top indicator-center badge badge-primary badge-sm">TC</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">top center</div>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-top indicator-end badge badge-primary badge-sm">TE</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">top end</div>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-bottom indicator-start badge badge-primary badge-sm">BS</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">bottom start</div>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-bottom indicator-center badge badge-primary badge-sm">BC</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">bottom center</div>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-bottom indicator-end badge badge-primary badge-sm">BE</span>
    <div class="bg-base-200 grid h-16 w-24 place-items-center rounded">bottom end</div>
  </div>
</div>`,
  name: "indicator-positions",
};
