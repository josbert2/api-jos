export default {
  description: "Custom options with title and description",
  html: `<div class="grid grid-cols-2 gap-3 w-full">
  <label class="custom-soft-option flex items-start gap-3">
    <input type="radio" name="plan-rich" class="radio radio-primary mt-0.5" checked />
    <div class="flex flex-col">
      <span class="label-text font-semibold">Monthly</span>
      <span class="helper-text">Billed every month, cancel anytime.</span>
    </div>
  </label>
  <label class="custom-soft-option flex items-start gap-3">
    <input type="radio" name="plan-rich" class="radio radio-primary mt-0.5" />
    <div class="flex flex-col">
      <span class="label-text font-semibold">Yearly</span>
      <span class="helper-text">Save 20% with annual billing.</span>
    </div>
  </label>
</div>`,
  name: "customOptions-rich",
};
