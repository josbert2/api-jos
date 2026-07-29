export default {
  description: "Status with label",
  html: `<div class="flex flex-col gap-2 text-sm">
  <div class="flex items-center gap-2">
    <span class="status status-success"></span>
    Operational
  </div>
  <div class="flex items-center gap-2">
    <span class="status status-warning"></span>
    Degraded performance
  </div>
  <div class="flex items-center gap-2">
    <span class="status status-error"></span>
    Major outage
  </div>
  <div class="flex items-center gap-2">
    <span class="status"></span>
    Unknown
  </div>
</div>`,
  name: "status-with-label",
};
