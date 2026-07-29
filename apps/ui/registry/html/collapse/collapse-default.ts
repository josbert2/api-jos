export default {
  description: "Default collapse",
  html: `<div class="w-full">
  <button type="button" class="btn btn-primary" aria-expanded="true" aria-controls="collapse-default-content">
    Toggle content
  </button>
  <div id="collapse-default-content" class="collapse mt-3 rounded-box border border-border p-4">
    <p>This panel is rendered open. Hide it by toggling the <code>hidden</code> class via your preferred JavaScript handler.</p>
  </div>
</div>`,
  name: "collapse-default",
};
