export default {
  description: "Card with header and footer",
  html: `<div class="card card-border w-80">
  <div class="card-header border-base-content/10 border-b">
    <h2 class="card-title">Project status</h2>
  </div>
  <div class="card-body">
    <p>Track the status of every initiative across the team.</p>
  </div>
  <div class="card-footer border-base-content/10 flex items-center justify-end gap-2 border-t">
    <button class="btn btn-sm btn-soft">Cancel</button>
    <button class="btn btn-sm btn-primary">Save</button>
  </div>
</div>`,
  name: "card-header-footer",
};
