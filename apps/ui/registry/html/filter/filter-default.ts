export default {
  description: "Default filter",
  html: `<form class="filter">
  <input class="btn btn-square filter-reset" type="reset" value="×" />
  <input class="btn" type="radio" name="frameworks" aria-label="React" />
  <input class="btn" type="radio" name="frameworks" aria-label="Vue" />
  <input class="btn" type="radio" name="frameworks" aria-label="Svelte" />
</form>`,
  name: "filter-default",
};
