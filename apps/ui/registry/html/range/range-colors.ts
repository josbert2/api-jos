export default {
  description: "Range colors",
  html: `<div class="flex w-full flex-col gap-4">
  <input type="range" min="0" max="100" value="40" class="range range-primary" />
  <input type="range" min="0" max="100" value="50" class="range range-secondary" />
  <input type="range" min="0" max="100" value="60" class="range range-accent" />
  <input type="range" min="0" max="100" value="70" class="range range-info" />
  <input type="range" min="0" max="100" value="80" class="range range-success" />
  <input type="range" min="0" max="100" value="60" class="range range-warning" />
  <input type="range" min="0" max="100" value="40" class="range range-error" />
</div>`,
  name: "range-colors",
};
