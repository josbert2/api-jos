export default {
  description: "Compact vertical timeline with descriptions",
  html: `<ul class="timeline timeline-compact timeline-vertical">
  <li>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-primary"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Order placed</p>
      <p class="text-xs text-base-content/70">May 1, 09:30</p>
    </div>
    <hr />
  </li>
  <li>
    <hr class="bg-primary" />
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-primary"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Shipped</p>
      <p class="text-xs text-base-content/70">May 2, 14:10</p>
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-base-content/40"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Out for delivery</p>
      <p class="text-xs text-base-content/70">Estimated May 3</p>
    </div>
  </li>
</ul>`,
  name: "timeline-compact",
};
