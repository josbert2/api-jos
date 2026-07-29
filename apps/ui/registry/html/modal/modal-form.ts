export default {
  description: "Modal containing a form",
  html: `<div class="relative h-full w-full overflow-hidden rounded-box border border-border bg-base-200">
  <div class="absolute inset-0 bg-neutral/40 backdrop-blur-sm"></div>
  <div class="modal !static !p-4 !opacity-100 !pointer-events-auto">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Invite a teammate</h3>
        </div>
        <div class="modal-body space-y-3">
          <div>
            <label class="label">Email</label>
            <input type="email" class="input w-full" placeholder="name@company.com" />
          </div>
          <div>
            <label class="label">Role</label>
            <select class="select w-full">
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-text">Cancel</button>
          <button type="button" class="btn btn-primary">Send invite</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  name: "modal-form",
};
