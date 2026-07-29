export default {
  description: "Switch with label",
  html: `<div class="flex w-full flex-col gap-3">
  <label class="flex items-center gap-3 cursor-pointer">
    <span class="switch switch-primary">
      <input type="checkbox" class="sr-only" checked />
    </span>
    <span class="text-base-content">Enable notifications</span>
  </label>
  <label class="flex items-center gap-3 cursor-pointer">
    <span class="switch switch-primary">
      <input type="checkbox" class="sr-only" />
    </span>
    <span class="text-base-content">Dark mode</span>
  </label>
  <label class="flex items-center gap-3 cursor-pointer">
    <span class="switch switch-success">
      <input type="checkbox" class="sr-only" checked />
    </span>
    <span class="text-base-content">Auto-save drafts</span>
  </label>
</div>`,
  name: "switches-label",
};
