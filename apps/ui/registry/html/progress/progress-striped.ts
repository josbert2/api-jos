export default {
  description: "Striped and animated progress",
  html: `<div class="flex w-72 flex-col gap-3">
  <div class="progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-primary progress-striped" style="width: 60%"></div>
  </div>
  <div class="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-success progress-striped progress-animated" style="width: 75%"></div>
  </div>
</div>`,
  name: "progress-striped",
};
