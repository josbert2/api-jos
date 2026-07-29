export default {
  description: "Group of collapses with shared trigger",
  html: `<div class="flex w-full flex-col gap-3">
  <div>
    <button type="button" class="btn btn-text" aria-expanded="true" aria-controls="collapse-group-1">
      Section A
    </button>
    <div id="collapse-group-1" class="collapse mt-2 rounded-box border border-border p-4">
      Content for section A.
    </div>
  </div>
  <div>
    <button type="button" class="btn btn-text" aria-expanded="false" aria-controls="collapse-group-2">
      Section B
    </button>
    <div id="collapse-group-2" class="collapse hidden mt-2 rounded-box border border-border p-4">
      Content for section B.
    </div>
  </div>
</div>`,
  name: "collapse-group",
};
