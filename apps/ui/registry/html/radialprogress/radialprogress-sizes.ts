export default {
  description: "Radial progress sizes",
  html: `<div class="flex items-center gap-4">
  <div class="radial-progress text-primary" style="--value: 50; --size: 3rem" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50</div>
  <div class="radial-progress text-primary" style="--value: 50; --size: 5rem" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
  <div class="radial-progress text-primary" style="--value: 50; --size: 7rem" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
  <div class="radial-progress text-primary" style="--value: 50; --size: 9rem; --thickness: 12px" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
</div>`,
  name: "radialprogress-sizes",
};
