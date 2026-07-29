export default {
  description: "Disabled switch",
  html: `<div class="flex items-center gap-3">
  <label class="switch">
    <input type="checkbox" class="sr-only" disabled />
  </label>
  <label class="switch switch-primary">
    <input type="checkbox" class="sr-only" checked disabled />
  </label>
</div>`,
  name: "switches-disabled",
};
