export default {
  description: "Label with helper text",
  html: `<div class="flex w-full flex-col">
  <label class="label-text" for="username">Username</label>
  <input type="text" id="username" class="input" placeholder="@username" />
  <span class="helper-text">Letters, numbers and underscores only.</span>
</div>`,
  name: "label-helper",
};
