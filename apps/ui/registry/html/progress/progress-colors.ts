export default {
  description: "Progress colors",
  html: `<div class="flex w-72 flex-col gap-3">
  <div class="progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-primary" style="width: 40%"></div>
  </div>
  <div class="progress" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-info" style="width: 55%"></div>
  </div>
  <div class="progress" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-success" style="width: 80%"></div>
  </div>
  <div class="progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-warning" style="width: 65%"></div>
  </div>
  <div class="progress" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-error" style="width: 90%"></div>
  </div>
</div>`,
  name: "progress-colors",
};
