export default {
  description: "Collapse rendered as a card",
  html: `<div class="w-full">
  <button type="button" class="btn btn-soft" aria-expanded="true" aria-controls="collapse-card-content">
    Show details
  </button>
  <div id="collapse-card-content" class="collapse mt-3 rounded-box bg-base-100 border border-border p-5 shadow-sm">
    <h4 class="font-medium mb-1">Order #1024</h4>
    <p class="text-sm text-base-content/70">Status: shipped via overnight carrier. Tracking number TRK-92381.</p>
  </div>
</div>`,
  name: "collapse-card",
};
