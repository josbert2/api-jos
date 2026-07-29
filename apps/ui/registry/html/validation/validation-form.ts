export default {
  description: "Native form validation",
  html: `<form class="validate flex w-full flex-col gap-4">
  <div class="flex flex-col">
    <label class="label-text" for="form-email">Email (required)</label>
    <input type="email" id="form-email" class="input" required value="hello@example.com" />
    <span class="success-message">Email looks valid.</span>
    <span class="error-message">Please enter a valid email.</span>
  </div>
  <div class="flex flex-col">
    <label class="label-text" for="form-name">Name (min 3 chars)</label>
    <input type="text" id="form-name" class="input" minlength="3" value="Jo" />
    <span class="success-message">Name accepted.</span>
    <span class="error-message">Name is too short.</span>
  </div>
</form>`,
  name: "validation-form",
};
