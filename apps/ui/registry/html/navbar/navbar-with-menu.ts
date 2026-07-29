export default {
  description: "Navbar with horizontal menu",
  html: `<nav class="navbar bg-base-100 rounded-box border border-border w-full">
  <div class="navbar-start">
    <a class="btn btn-text text-xl font-semibold" href="#">Curve UI</a>
  </div>
  <div class="navbar-center">
    <ul class="menu menu-horizontal">
      <li><a href="#">Docs</a></li>
      <li><a href="#" class="menu-active">Components</a></li>
      <li><a href="#">Pricing</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <button type="button" class="btn btn-soft">Sign in</button>
  </div>
</nav>`,
  name: "navbar-with-menu",
};
