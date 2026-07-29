export default {
  description: "Custom options group",
  html: `<div class="flex w-full flex-col gap-3">
  <label class="custom-option flex items-center gap-3">
    <input type="radio" name="plan-group" class="radio radio-primary" checked />
    <span class="label-text">Free — for personal use</span>
  </label>
  <label class="custom-option flex items-center gap-3">
    <input type="radio" name="plan-group" class="radio radio-primary" />
    <span class="label-text">Pro — for small teams</span>
  </label>
  <label class="custom-option flex items-center gap-3">
    <input type="radio" name="plan-group" class="radio radio-primary" />
    <span class="label-text">Enterprise — for large orgs</span>
  </label>
</div>`,
  name: "customOptions-group",
};
