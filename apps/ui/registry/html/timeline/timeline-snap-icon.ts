export default {
  description: "Vertical timeline with icons snapped to top",
  html: `<ul class="timeline timeline-vertical timeline-snap-icon">
  <li>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Step one completed</p>
      <p class="text-xs text-base-content/70">Initial setup successful.</p>
    </div>
    <hr />
  </li>
  <li>
    <hr class="bg-success" />
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Step two completed</p>
      <p class="text-xs text-base-content/70">Configuration validated.</p>
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-base-content/40"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">
      <p class="font-medium">Step three pending</p>
      <p class="text-xs text-base-content/70">Awaiting approval.</p>
    </div>
  </li>
</ul>`,
  name: "timeline-snap-icon",
};
