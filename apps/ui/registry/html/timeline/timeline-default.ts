export default {
  description: "Default horizontal timeline",
  html: `<ul class="timeline">
  <li>
    <div class="timeline-start">2020</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-primary"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">First commit</div>
    <hr />
  </li>
  <li>
    <hr class="bg-primary" />
    <div class="timeline-start">2022</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-primary"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">Public beta</div>
    <hr />
  </li>
  <li>
    <hr />
    <div class="timeline-start">2024</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-base-content/40"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">v1.0 release</div>
  </li>
</ul>`,
  name: "timeline-default",
};
