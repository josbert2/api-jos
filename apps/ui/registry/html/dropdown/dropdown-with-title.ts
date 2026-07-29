export default {
  description: "Dropdown grouped with titles",
  html: `<div class="relative inline-flex">
  <button type="button" class="btn btn-soft" aria-expanded="true">
    Workspace
  </button>
  <ul class="dropdown-menu min-w-56 opacity-100 mt-2 absolute top-full start-0">
    <li class="dropdown-title">Personal</li>
    <li><a class="dropdown-item dropdown-active" href="#">Felipe</a></li>
    <li class="dropdown-title">Teams</li>
    <li><a class="dropdown-item" href="#">Bookforce</a></li>
    <li><a class="dropdown-item" href="#">Relay</a></li>
    <li><a class="dropdown-item" href="#">Realtes</a></li>
    <li><a class="dropdown-item dropdown-disabled" href="#">Archived team</a></li>
  </ul>
</div>`,
  name: "dropdown-with-title",
};
