export default {
  description: "Drawer anchored to bottom",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <aside class="drawer drawer-bottom !absolute !z-10 translate-y-0 max-h-48">
    <div class="drawer-header">
      <h3 class="drawer-title">Quick actions</h3>
    </div>
    <div class="drawer-body">
      <div class="flex gap-2">
        <button type="button" class="btn btn-soft btn-primary">Share</button>
        <button type="button" class="btn btn-soft">Save</button>
        <button type="button" class="btn btn-soft btn-error">Delete</button>
      </div>
    </div>
  </aside>
</div>`,
  name: "drawer-bottom",
};
