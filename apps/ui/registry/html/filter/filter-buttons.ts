export default {
  description: "Filter with colored buttons",
  html: `<form class="filter">
  <input class="btn btn-square filter-reset" type="reset" value="×" />
  <input class="btn btn-primary" type="radio" name="size" aria-label="Small" />
  <input class="btn btn-primary" type="radio" name="size" aria-label="Medium" />
  <input class="btn btn-primary" type="radio" name="size" aria-label="Large" />
</form>`,
  name: "filter-buttons",
};
