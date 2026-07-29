export default {
  description: "Horizontal card layout",
  html: `<div class="card card-side card-border w-[28rem]">
  <figure class="bg-base-200 w-32 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-base-content/30 h-10 w-10"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75v-9A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v9A2.25 2.25 0 0 1 19.5 18h-15a2.25 2.25 0 0 1-2.25-2.25Z"/></svg>
  </figure>
  <div class="card-body">
    <h2 class="card-title">Side card</h2>
    <p>Use <code>card-side</code> to lay out the figure beside the body.</p>
    <div class="card-actions">
      <button class="btn btn-sm btn-soft">Read more</button>
    </div>
  </div>
</div>`,
  name: "card-side",
};
