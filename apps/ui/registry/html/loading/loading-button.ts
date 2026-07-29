export default {
  description: "Loading inside a button",
  html: `<div class="flex items-center gap-3">
  <button class="btn btn-primary">
    <span class="loading loading-spinner loading-sm"></span>
    Loading
  </button>
  <button class="btn btn-soft">
    <span class="loading loading-dots loading-sm"></span>
    Saving
  </button>
</div>`,
  name: "loading-button",
};
