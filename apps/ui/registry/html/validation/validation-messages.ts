export default {
  description: "Validation messages",
  html: `<div class="flex w-full flex-col gap-4">
  <div class="flex flex-col">
    <label class="label-text" for="val-email">Email</label>
    <input type="email" id="val-email" class="input is-valid" value="hello@example.com" />
    <span class="success-message" style="display:block">Looks good.</span>
  </div>
  <div class="flex flex-col">
    <label class="label-text" for="val-pass">Password</label>
    <input type="password" id="val-pass" class="input is-invalid" value="123" />
    <span class="error-message" style="display:block">Must be at least 8 characters.</span>
  </div>
</div>`,
  name: "validation-messages",
};
