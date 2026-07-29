export default {
  description: "Footer with brand logo and tagline",
  html: `<footer class="footer bg-base-100 p-10 rounded-box border border-border">
  <aside>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
    <p class="font-medium">Curve UI<br/><span class="text-sm font-normal text-base-content/70">Beautiful interfaces, faster.</span></p>
  </aside>
  <nav>
    <h6 class="footer-title">Product</h6>
    <a class="link link-hover" href="#">Components</a>
    <a class="link link-hover" href="#">Templates</a>
    <a class="link link-hover" href="#">Pricing</a>
  </nav>
  <nav>
    <h6 class="footer-title">Resources</h6>
    <a class="link link-hover" href="#">Documentation</a>
    <a class="link link-hover" href="#">Changelog</a>
    <a class="link link-hover" href="#">Status</a>
  </nav>
</footer>`,
  name: "footer-with-logo",
};
