export default {
  description: "File input with label and helper text",
  html: `<div class="flex w-full flex-col">
  <label class="label-text" for="avatar">Profile picture</label>
  <input type="file" id="avatar" class="input" accept="image/*" />
  <span class="helper-text">PNG, JPG up to 5MB.</span>
</div>`,
  name: "fileinput-label",
};
