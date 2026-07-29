export default {
  description: "Swap toggling icons",
  html: `<label class="swap swap-rotate text-2xl">
  <input type="checkbox" />
  <svg xmlns="http://www.w3.org/2000/svg" class="swap-on size-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  <svg xmlns="http://www.w3.org/2000/svg" class="swap-off size-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</label>`,
  name: "swap-icon",
};
