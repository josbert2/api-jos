export default {
  description: "Validation on checkboxes, radios and switches",
  html: `<div class="flex w-full flex-col gap-3">
  <label class="flex items-center gap-2">
    <input type="checkbox" class="checkbox is-valid" checked />
    <span class="label-text">Valid checkbox</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="checkbox" class="checkbox is-invalid" />
    <span class="label-text">Invalid checkbox</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="radio" name="val-radio" class="radio is-valid" checked />
    <span class="label-text">Valid radio</span>
  </label>
  <label class="flex items-center gap-2">
    <input type="checkbox" class="switch is-invalid" />
    <span class="label-text">Invalid switch</span>
  </label>
</div>`,
  name: "validation-selection",
};
