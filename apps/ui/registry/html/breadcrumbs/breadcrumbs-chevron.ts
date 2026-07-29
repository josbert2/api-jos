export default {
  description: "Breadcrumbs with chevron separators",
  html: `<nav class="breadcrumbs text-sm">
  <ol>
    <li><a href="#">Dashboard</a></li>
    <li class="breadcrumbs-separator">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
    </li>
    <li><a href="#">Settings</a></li>
    <li class="breadcrumbs-separator">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
    </li>
    <li><a href="#">Team</a></li>
    <li class="breadcrumbs-separator">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
    </li>
    <li>Members</li>
  </ol>
</nav>`,
  name: "breadcrumbs-chevron",
};
