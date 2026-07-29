export default {
  description: "Navbar with search input and avatar",
  html: `<nav class="navbar bg-base-100 rounded-box border border-border w-full gap-3">
  <div class="navbar-start">
    <a class="btn btn-text text-xl font-semibold" href="#">Curve UI</a>
  </div>
  <div class="navbar-center grow">
    <input type="search" placeholder="Search..." class="input w-full max-w-md" />
  </div>
  <div class="navbar-end gap-2">
    <button type="button" class="btn btn-text btn-circle" aria-label="Notifications">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    </button>
    <div class="avatar avatar-placeholder">
      <div class="bg-primary text-primary-content size-9 rounded-full">
        <span class="text-sm">JD</span>
      </div>
    </div>
  </div>
</nav>`,
  name: "navbar-with-search",
};
