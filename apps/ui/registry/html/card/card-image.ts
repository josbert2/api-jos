export default {
  description: "Card with image header",
  html: `<div class="card w-80">
  <figure class="bg-base-200 h-32 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-base-content/30 h-12 w-12"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>
  </figure>
  <div class="card-body">
    <h2 class="card-title">New release</h2>
    <p>Cards support figures at the top or bottom for headers and footers.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary btn-sm">View</button>
    </div>
  </div>
</div>`,
  name: "card-image",
};
