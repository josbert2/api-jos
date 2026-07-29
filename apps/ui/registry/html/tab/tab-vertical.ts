export default {
  description: "Vertical tabs",
  html: `<div class="w-full">
  <ul class="tabs tabs-bordered tabs-vertical w-48" role="tablist">
    <li role="presentation"><button type="button" class="tab tab-active">General</button></li>
    <li role="presentation"><button type="button" class="tab">Members</button></li>
    <li role="presentation"><button type="button" class="tab">Integrations</button></li>
    <li role="presentation"><button type="button" class="tab">Webhooks</button></li>
  </ul>
</div>`,
  name: "tab-vertical",
};
