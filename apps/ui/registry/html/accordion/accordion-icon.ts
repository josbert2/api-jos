export default {
  description: "Accordion with leading icons",
  html: `<div class="accordion w-full">
  <div class="accordion-item active">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      <span class="inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        About this product
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content w-full overflow-hidden px-5 pb-4">
      A short overview of the product features and benefits.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="accordion-toggle inline-flex items-center justify-between gap-x-2">
      <span class="inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Customer support
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content hidden w-full overflow-hidden px-5 pb-4">
      Contact our support team via email or chat 24/7.
    </div>
  </div>
</div>`,
  name: "accordion-icon",
};
