export default {
  description: "Radio group with labels",
  html: `<div class="flex w-full flex-col gap-3">
  <label class="flex items-center gap-2">
    <input type="radio" name="plan" class="radio radio-primary" checked />
    <span class="label-text">Free</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="radio" name="plan" class="radio radio-primary" />
    <span class="label-text">Pro</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="radio" name="plan" class="radio radio-primary" />
    <span class="label-text">Enterprise</span>
  </label>
</div>`,
  name: "radio-group",
};
