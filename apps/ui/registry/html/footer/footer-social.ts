export default {
  description: "Centered footer with social icons",
  html: `<footer class="footer footer-center bg-base-100 p-10 rounded-box border border-border">
  <nav>
    <div class="grid grid-flow-col gap-4">
      <a href="#" aria-label="Twitter" class="text-base-content/70 hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.49 8.49 0 0 1-2.36.65 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1A4.1 4.1 0 0 0 11.5 8.7c0 .32.04.63.1.92A11.65 11.65 0 0 1 3.1 4.85a4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.68v-.53A8.34 8.34 0 0 0 22 5.92z"/></svg>
      </a>
      <a href="#" aria-label="GitHub" class="text-base-content/70 hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
      </a>
      <a href="#" aria-label="LinkedIn" class="text-base-content/70 hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z"/></svg>
      </a>
    </div>
  </nav>
  <aside>
    <p class="text-sm text-base-content/70">Copyright &copy; 2026 - Curve UI</p>
  </aside>
</footer>`,
  name: "footer-social",
};
