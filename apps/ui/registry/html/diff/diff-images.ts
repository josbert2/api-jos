export default {
  description: "Diff comparing two image renders",
  html: `<figure class="diff aspect-[16/9] w-full" tabindex="0">
  <div class="diff-item-1" role="img" tabindex="0">
    <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-primary-content text-2xl font-semibold">Original</div>
  </div>
  <div class="diff-item-2" role="img">
    <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-warning text-secondary-content text-2xl font-semibold">Edited</div>
  </div>
  <div class="diff-resizer"></div>
</figure>`,
  name: "diff-images",
};
