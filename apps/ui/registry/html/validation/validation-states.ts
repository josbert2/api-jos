export default {
  description: "Valid and invalid states",
  html: `<div class="flex w-full flex-col gap-3">
  <input type="text" class="input is-valid" value="Valid value" />
  <input type="text" class="input is-invalid" value="Invalid value" />
  <select class="select is-valid"><option>Valid selection</option></select>
  <select class="select is-invalid"><option>Invalid selection</option></select>
</div>`,
  name: "validation-states",
};
