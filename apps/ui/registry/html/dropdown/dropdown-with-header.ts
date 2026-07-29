export default {
  description: "Dropdown with header and footer",
  html: `<div class="relative inline-flex">
  <button type="button" class="btn btn-text" aria-expanded="true">
    Notifications
  </button>
  <ul class="dropdown-menu min-w-64 opacity-100 mt-2 absolute top-full start-0">
    <li class="dropdown-header">3 new notifications</li>
    <li><a class="dropdown-item" href="#">New comment on your post</a></li>
    <li><a class="dropdown-item" href="#">Build #42 succeeded</a></li>
    <li><a class="dropdown-item" href="#">Invoice ready for review</a></li>
    <li class="dropdown-footer">View all</li>
  </ul>
</div>`,
  name: "dropdown-with-header",
};
