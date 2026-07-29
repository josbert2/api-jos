export default {
  description: "Accordion with disabled item",
  html: `<div class="accordion w-full">
  <div class="accordion-item active">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      Available section
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content w-full overflow-hidden px-5 pb-4">
      This panel can be expanded normally.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" disabled class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      Disabled section
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content hidden w-full overflow-hidden px-5 pb-4">
      This content cannot be opened.
    </div>
  </div>
</div>`,
  name: "accordion-disabled",
};
