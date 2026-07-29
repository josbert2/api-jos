export default {
  description: "Table with hover and active rows",
  html: `<div class="overflow-x-auto w-full">
  <table class="table">
    <thead>
      <tr><th>Order</th><th>Item</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr class="row-hover"><td>#A-201</td><td>Laptop stand</td><td>Shipped</td></tr>
      <tr class="row-active"><td>#A-202</td><td>Wireless mouse</td><td>Selected</td></tr>
      <tr class="row-hover"><td>#A-203</td><td>USB-C dock</td><td>Processing</td></tr>
    </tbody>
  </table>
</div>`,
  name: "table-hover",
};
