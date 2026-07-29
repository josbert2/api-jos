export default {
  description: "Alert with title and description",
  html: `<div role="alert" class="alert alert-soft alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <div class="flex flex-col gap-1">
    <h3 class="text-base font-semibold">Payment received</h3>
    <p class="text-sm opacity-80">Your invoice has been paid successfully.</p>
  </div>
</div>`,
  name: "alert-title",
};
