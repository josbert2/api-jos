export default {
  description: "Default accordion",
  html: `<div class="accordion w-full">
  <div class="accordion-item active">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      What is FlyonUI?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content w-full overflow-hidden px-5 pb-4">
      FlyonUI is a Tailwind CSS component library that provides a rich set of components and utilities to build modern, responsive interfaces.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      Is FlyonUI free?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content hidden w-full overflow-hidden px-5 pb-4">
      Yes, FlyonUI is open source and free to use in personal and commercial projects.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      How do I install it?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content hidden w-full overflow-hidden px-5 pb-4">
      Install via npm and add the plugin to your Tailwind configuration.
    </div>
  </div>
</div>`,
  name: "accordion-default",
};
