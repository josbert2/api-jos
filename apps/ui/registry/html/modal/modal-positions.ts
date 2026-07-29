export default {
  description: "Modal anchored to top",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <div class="modal modal-top !static !p-4 !opacity-100 !pointer-events-auto">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Top modal</h3>
        </div>
        <div class="modal-body">
          <p>Use <code>modal-top</code>, <code>modal-middle</code> (default) or <code>modal-bottom</code> together with the <code>-start</code> / <code>-end</code> alignment modifiers.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  name: "modal-positions",
};
