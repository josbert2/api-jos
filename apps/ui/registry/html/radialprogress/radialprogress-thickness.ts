export default {
  description: "Radial progress thickness",
  html: `<div class="flex items-center gap-4">
  <div class="radial-progress text-primary" style="--value: 65; --thickness: 2px" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
  <div class="radial-progress text-primary" style="--value: 65; --thickness: 8px" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
  <div class="radial-progress text-primary" style="--value: 65; --thickness: 16px" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
</div>`,
  name: "radialprogress-thickness",
};
