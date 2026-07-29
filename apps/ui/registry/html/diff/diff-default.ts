export default {
  description: "Default diff comparison",
  html: `<figure class="diff aspect-[16/9] w-full" tabindex="0">
  <div class="diff-item-1" role="img" tabindex="0">
    <div class="flex h-full w-full items-center justify-center bg-primary text-primary-content text-3xl font-bold">BEFORE</div>
  </div>
  <div class="diff-item-2" role="img">
    <div class="flex h-full w-full items-center justify-center bg-secondary text-secondary-content text-3xl font-bold">AFTER</div>
  </div>
  <div class="diff-resizer"></div>
</figure>`,
  name: "diff-default",
};
