export default {
  description: "Diff comparing typography or themes",
  html: `<figure class="diff aspect-[16/9] w-full" tabindex="0">
  <div class="diff-item-1" role="img" tabindex="0">
    <div class="flex h-full w-full items-center justify-center bg-base-100 text-base-content text-5xl font-serif">Light</div>
  </div>
  <div class="diff-item-2" role="img">
    <div class="flex h-full w-full items-center justify-center bg-neutral text-neutral-content text-5xl font-mono">Dark</div>
  </div>
  <div class="diff-resizer"></div>
</figure>`,
  name: "diff-text",
};
