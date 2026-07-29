export default {
  description: "Radial progress with semantic colors",
  html: `<div class="flex flex-wrap items-center gap-4">
  <div class="radial-progress text-primary" style="--value: 60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div>
  <div class="radial-progress text-info" style="--value: 45" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div>
  <div class="radial-progress text-success" style="--value: 80" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
  <div class="radial-progress text-warning" style="--value: 35" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">35%</div>
  <div class="radial-progress text-error" style="--value: 95" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">95%</div>
</div>`,
  name: "radialprogress-colors",
};
