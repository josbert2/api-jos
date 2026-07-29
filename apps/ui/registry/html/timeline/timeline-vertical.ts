export default {
  description: "Vertical timeline",
  html: `<ul class="timeline timeline-vertical">
  <li>
    <div class="timeline-start">Mon</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-success"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">Kickoff meeting</div>
    <hr />
  </li>
  <li>
    <hr class="bg-success" />
    <div class="timeline-start">Wed</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-success"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">Design review</div>
    <hr />
  </li>
  <li>
    <hr />
    <div class="timeline-start">Fri</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-base-content/40"><circle cx="12" cy="12" r="6"/></svg>
    </div>
    <div class="timeline-end timeline-box">Ship to staging</div>
  </li>
</ul>`,
  name: "timeline-vertical",
};
