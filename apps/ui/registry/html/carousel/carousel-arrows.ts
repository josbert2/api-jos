export default {
  description: "Carousel with previous and next arrows",
  html: `<div class="carousel relative w-full">
  <div class="carousel-body opacity-100">
    <div class="carousel-slide">
      <div class="flex h-48 w-full items-center justify-center bg-primary text-primary-content text-2xl font-semibold">Slide 1</div>
    </div>
    <div class="carousel-slide">
      <div class="flex h-48 w-full items-center justify-center bg-secondary text-secondary-content text-2xl font-semibold">Slide 2</div>
    </div>
  </div>
  <button type="button" class="carousel-prev start-2 size-9.5 rounded-full bg-base-100 shadow">
    <span class="text-base-content text-2xl">&lsaquo;</span>
  </button>
  <button type="button" class="carousel-next end-2 size-9.5 rounded-full bg-base-100 shadow">
    <span class="text-base-content text-2xl">&rsaquo;</span>
  </button>
</div>`,
  name: "carousel-arrows",
};
