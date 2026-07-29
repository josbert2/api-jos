export default {
  description: "Lifted tabs with content panel",
  html: `<div class="w-full">
  <ul class="tabs tabs-lifted" role="tablist">
    <li role="presentation"><button type="button" class="tab">Tab 1</button></li>
    <li role="presentation"><button type="button" class="tab tab-active">Tab 2</button></li>
    <li role="presentation"><button type="button" class="tab">Tab 3</button></li>
  </ul>
  <div class="tab-content rounded-box border border-border bg-base-100 p-6">
    <p>Lifted tabs sit on top of a card-like content panel. The active tab connects visually with its body.</p>
  </div>
</div>`,
  name: "tab-lifted",
};
