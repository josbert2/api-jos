export default {
  description: "Bordered tabs",
  html: `<div class="w-full">
  <ul class="tabs tabs-bordered" role="tablist">
    <li role="presentation"><button type="button" class="tab tab-active">Profile</button></li>
    <li role="presentation"><button type="button" class="tab">Notifications</button></li>
    <li role="presentation"><button type="button" class="tab">Security</button></li>
    <li role="presentation"><button type="button" class="tab" disabled>Billing</button></li>
  </ul>
</div>`,
  name: "tab-bordered",
};
