export default {
  description: "Accordion with bordered style",
  html: `<div class="accordion accordion-bordered w-full">
  <div class="accordion-item active">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      Section one
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content w-full overflow-hidden px-5 pb-4">
      Bordered accordion adds a divider between items and a rounded outer border.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      Section two
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content hidden w-full overflow-hidden px-5 pb-4">
      Click any header to expand its panel.
    </div>
  </div>
</div>`,
  name: "accordion-bordered",
};
