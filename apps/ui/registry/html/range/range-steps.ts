export default {
  description: "Range with steps",
  html: `<div class="flex w-full flex-col gap-2">
  <input type="range" min="0" max="100" value="40" step="25" class="range range-primary" />
  <div class="flex justify-between px-1 text-xs text-base-content/60">
    <span>0</span>
    <span>25</span>
    <span>50</span>
    <span>75</span>
    <span>100</span>
  </div>
</div>`,
  name: "range-steps",
};
