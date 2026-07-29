export default {
  description: "Drawer anchored to start",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <aside class="drawer drawer-start !absolute !z-10 translate-x-0">
    <div class="drawer-header">
      <h3 class="drawer-title">Filters</h3>
    </div>
    <div class="drawer-body">
      <p class="text-sm text-base-content/70">Sidebar that slides in from the left edge of the viewport.</p>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-primary">Apply</button>
    </div>
  </aside>
</div>`,
  name: "drawer-start",
};
