export default {
  description: "Filter with explicit reset button",
  html: `<form class="filter">
  <input class="btn btn-square btn-soft" type="reset" value="×" />
  <input class="btn btn-soft btn-primary" type="radio" name="status" aria-label="Open" />
  <input class="btn btn-soft btn-success" type="radio" name="status" aria-label="Done" />
  <input class="btn btn-soft btn-warning" type="radio" name="status" aria-label="Paused" />
  <input class="btn btn-soft btn-error" type="radio" name="status" aria-label="Closed" />
</form>`,
  name: "filter-reset",
};
