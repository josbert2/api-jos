export default {
  description: "Pulsing status indicator",
  html: `<div class="flex items-center gap-2 text-sm">
  <span class="relative inline-flex">
    <span class="status status-success"></span>
    <span class="bg-success absolute inset-0 inline-flex animate-ping rounded-full opacity-75"></span>
  </span>
  Live
</div>`,
  name: "status-pulse",
};
