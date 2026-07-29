export default {
  description: "Breadcrumbs with icons",
  html: `<nav class="breadcrumbs text-sm">
  <ol>
    <li>
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75 12 3l9 6.75V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.75Z"/></svg>
        Home
      </a>
    </li>
    <li class="breadcrumbs-separator">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
    </li>
    <li>
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026M3.75 9.776c-.6.082-1.115.41-1.43.93l-1.5 2.5A2.25 2.25 0 0 0 2.75 16.75h18.5a2.25 2.25 0 0 0 1.93-3.544l-1.5-2.5a2.25 2.25 0 0 0-1.43-.93M3.75 9.776V4.875c0-1.036.84-1.875 1.875-1.875h12.75c1.035 0 1.875.84 1.875 1.875v4.901"/></svg>
        Library
      </a>
    </li>
    <li class="breadcrumbs-separator">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
    </li>
    <li>Documents</li>
  </ol>
</nav>`,
  name: "breadcrumbs-icons",
};
