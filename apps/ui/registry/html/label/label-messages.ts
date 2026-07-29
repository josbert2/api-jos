export default {
  description: "Success and error messages",
  html: `<div class="flex w-full flex-col gap-4">
  <div class="flex flex-col">
    <label class="label-text" for="msg-email">Email</label>
    <input type="email" id="msg-email" class="input is-valid" value="hello@example.com" />
    <span class="success-message" style="display:block">Looks good.</span>
  </div>
  <div class="flex flex-col">
    <label class="label-text" for="msg-password">Password</label>
    <input type="password" id="msg-password" class="input is-invalid" value="123" />
    <span class="error-message" style="display:block">At least 8 characters required.</span>
  </div>
</div>`,
  name: "label-messages",
};
