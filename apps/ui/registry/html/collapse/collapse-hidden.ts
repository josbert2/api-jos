export default {
  description: "Collapse in hidden state",
  html: `<div class="w-full">
  <button type="button" class="btn btn-outline" aria-expanded="false" aria-controls="collapse-hidden-content">
    Toggle hidden content
  </button>
  <div id="collapse-hidden-content" class="collapse hidden mt-3 rounded-box border border-border p-4">
    <p>This panel starts hidden. Remove the <code>hidden</code> class to reveal it.</p>
  </div>
</div>`,
  name: "collapse-hidden",
};
