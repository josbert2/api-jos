export default {
  description: "Carousel with bar pagination",
  html: `<div class="carousel relative w-full">
  <div class="carousel-body opacity-100">
    <div class="carousel-slide">
      <div class="flex h-48 w-full items-center justify-center bg-primary text-primary-content text-2xl font-semibold">Slide 1</div>
    </div>
    <div class="carousel-slide">
      <div class="flex h-48 w-full items-center justify-center bg-secondary text-secondary-content text-2xl font-semibold">Slide 2</div>
    </div>
    <div class="carousel-slide">
      <div class="flex h-48 w-full items-center justify-center bg-accent text-accent-content text-2xl font-semibold">Slide 3</div>
    </div>
  </div>
  <div class="absolute bottom-3 inset-x-0 flex justify-center gap-2">
    <span class="carousel-box bg-primary"></span>
    <span class="carousel-box"></span>
    <span class="carousel-box"></span>
  </div>
</div>`,
  name: "carousel-bars",
};
