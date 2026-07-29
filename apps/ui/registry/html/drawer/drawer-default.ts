export default {
  description: "Default drawer in open state",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <aside class="drawer drawer-end !absolute !z-10 translate-x-0">
    <div class="drawer-header">
      <h3 class="drawer-title">Notifications</h3>
      <button type="button" class="btn btn-text btn-circle" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body">
      <p class="text-sm text-base-content/70">You have 3 unread notifications. Pull-to-refresh is disabled while the drawer is visible.</p>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-text">Cancel</button>
      <button type="button" class="btn btn-primary">Mark as read</button>
    </div>
  </aside>
</div>`,
  name: "drawer-default",
};
