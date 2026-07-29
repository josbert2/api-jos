export default {
  description: "Vertical progress bars",
  html: `<div class="flex h-40 items-end gap-3">
  <div class="progress progress-vertical" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-primary" style="height: 30%"></div>
  </div>
  <div class="progress progress-vertical" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-info" style="height: 60%"></div>
  </div>
  <div class="progress progress-vertical" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-success" style="height: 80%"></div>
  </div>
</div>`,
  name: "progress-vertical",
};
