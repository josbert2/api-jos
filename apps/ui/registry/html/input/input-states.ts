export default {
  description: "Input validation states",
  html: `<div class="flex w-full flex-col gap-3">
  <input type="text" class="input is-valid" value="Valid input" />
  <input type="text" class="input is-invalid" value="Invalid input" />
  <input type="text" class="input" placeholder="Disabled" disabled />
</div>`,
  name: "input-states",
};
