export default {
  description: "Modal dialog sizes",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <div class="modal !static !p-4 !opacity-100 !pointer-events-auto">
    <div class="modal-dialog modal-dialog-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Small modal</h3>
        </div>
        <div class="modal-body">
          <p class="text-sm">Use <code>modal-dialog-sm</code> for compact prompts. Other sizes: <code>modal-dialog-md</code>, <code>modal-dialog-lg</code>, <code>modal-dialog-xl</code>.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Got it</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  name: "modal-sizes",
};
