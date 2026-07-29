export default {
  description: "Default dropdown",
  html: `<div class="relative inline-flex">
  <button type="button" class="btn btn-primary" aria-expanded="true">
    Open menu
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <ul class="dropdown-menu min-w-44 opacity-100 mt-2 absolute top-full start-0">
    <li><a class="dropdown-item" href="#">Profile</a></li>
    <li><a class="dropdown-item" href="#">Settings</a></li>
    <li><a class="dropdown-item" href="#">Billing</a></li>
    <li><a class="dropdown-item" href="#">Sign out</a></li>
  </ul>
</div>`,
  name: "dropdown-default",
};
