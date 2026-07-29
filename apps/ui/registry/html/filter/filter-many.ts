export default {
  description: "Filter with many options",
  html: `<form class="filter">
  <input class="btn btn-square filter-reset" type="reset" value="×" />
  <input class="btn" type="radio" name="lang" aria-label="HTML" />
  <input class="btn" type="radio" name="lang" aria-label="CSS" />
  <input class="btn" type="radio" name="lang" aria-label="JS" />
  <input class="btn" type="radio" name="lang" aria-label="TS" />
  <input class="btn" type="radio" name="lang" aria-label="Go" />
  <input class="btn" type="radio" name="lang" aria-label="Rust" />
</form>`,
  name: "filter-many",
};
