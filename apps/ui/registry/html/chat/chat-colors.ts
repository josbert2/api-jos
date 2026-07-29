export default {
  description: "Chat bubbles with semantic colors",
  html: `<div class="flex w-full flex-col">
  <div class="chat chat-sender">
    <div class="chat-bubble bg-primary text-primary-content">Primary message</div>
  </div>
  <div class="chat chat-sender">
    <div class="chat-bubble bg-secondary text-secondary-content">Secondary message</div>
  </div>
  <div class="chat chat-sender">
    <div class="chat-bubble bg-success text-success-content">Success message</div>
  </div>
  <div class="chat chat-sender">
    <div class="chat-bubble bg-error text-error-content">Error message</div>
  </div>
</div>`,
  name: "chat-colors",
};
