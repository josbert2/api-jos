export default {
  description: "Checkbox with label",
  html: `<div class="flex w-full flex-col gap-3">
  <label class="flex items-center gap-2">
    <input type="checkbox" class="checkbox checkbox-primary" checked />
    <span class="label-text">Subscribe to newsletter</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="checkbox" class="checkbox checkbox-primary" />
    <span class="label-text">Accept terms and conditions</span>
  </label>
</div>`,
  name: "checkbox-label",
};
