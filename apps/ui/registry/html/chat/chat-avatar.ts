export default {
  description: "Chat with avatars",
  html: `<div class="flex w-full flex-col">
  <div class="chat chat-receiver">
    <div class="chat-avatar avatar avatar-placeholder">
      <div class="bg-primary text-primary-content size-10 rounded-full">
        <span class="text-sm">AL</span>
      </div>
    </div>
    <div class="chat-bubble">Welcome aboard! Let me know if you need anything.</div>
  </div>
  <div class="chat chat-sender">
    <div class="chat-avatar avatar avatar-placeholder">
      <div class="bg-accent text-accent-content size-10 rounded-full">
        <span class="text-sm">JM</span>
      </div>
    </div>
    <div class="chat-bubble">Thanks! Excited to get started.</div>
  </div>
</div>`,
  name: "chat-avatar",
};
