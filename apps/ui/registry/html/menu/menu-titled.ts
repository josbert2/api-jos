export default {
  description: "Menu with section titles",
  html: `<ul class="menu w-64 bg-base-100 border border-border">
  <li class="menu-title">Workspace</li>
  <li><a href="#">Overview</a></li>
  <li><a href="#" class="menu-active">Members</a></li>
  <li><a href="#">Integrations</a></li>
  <li class="menu-title">Account</li>
  <li><a href="#">Profile</a></li>
  <li><a href="#">Billing</a></li>
  <li class="menu-disabled"><a>Archived</a></li>
</ul>`,
  name: "menu-titled",
};
