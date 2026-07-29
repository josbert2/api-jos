export default {
  description: "Multiple stats side by side",
  html: `<div class="stats stats-border">
  <div class="stat">
    <div class="stat-title">Active users</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Jan 1 — Jan 31</div>
  </div>
  <div class="stat">
    <div class="stat-title">New signups</div>
    <div class="stat-value">2,891</div>
    <div class="stat-desc text-success">+12% from last month</div>
  </div>
  <div class="stat">
    <div class="stat-title">Churn</div>
    <div class="stat-value">0.9%</div>
    <div class="stat-desc text-error">+0.2% from last month</div>
  </div>
</div>`,
  name: "stat-multiple",
};
