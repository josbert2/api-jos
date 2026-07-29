export default {
  description: "Indicator on a button",
  html: `<div class="flex items-center gap-6">
  <div class="indicator">
    <span class="indicator-item badge badge-error badge-sm">3</span>
    <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/></svg>
      Notifications
    </button>
  </div>
  <div class="indicator">
    <span class="indicator-item indicator-bottom badge badge-success badge-sm">live</span>
    <button class="btn btn-soft">Stream</button>
  </div>
</div>`,
  name: "indicator-button",
};
