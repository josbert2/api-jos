export default {
  description: "Swap with rotate animation",
  html: `<label class="swap swap-rotate text-3xl">
  <input type="checkbox" />
  <svg xmlns="http://www.w3.org/2000/svg" class="swap-on size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13a9 9 0 1 1-9.64-12 7 7 0 0 0 9.64 12z"/></svg>
  <svg xmlns="http://www.w3.org/2000/svg" class="swap-off size-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg>
</label>`,
  name: "swap-rotate",
};
