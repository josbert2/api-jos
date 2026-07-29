export default {
  description: "Avatar with presence status",
  html: `<div class="flex items-center gap-4">
  <div class="avatar avatar-placeholder avatar-online-bottom">
    <div class="bg-neutral text-neutral-content w-16 rounded-full">
      <span>JD</span>
    </div>
  </div>
  <div class="avatar avatar-placeholder avatar-offline-bottom">
    <div class="bg-neutral text-neutral-content w-16 rounded-full">
      <span>FM</span>
    </div>
  </div>
  <div class="avatar avatar-placeholder avatar-busy-bottom">
    <div class="bg-neutral text-neutral-content w-16 rounded-full">
      <span>AB</span>
    </div>
  </div>
  <div class="avatar avatar-placeholder avatar-away-bottom">
    <div class="bg-neutral text-neutral-content w-16 rounded-full">
      <span>CD</span>
    </div>
  </div>
</div>`,
  name: "avatar-status",
};
