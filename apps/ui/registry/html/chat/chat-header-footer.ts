export default {
  description: "Chat with header and footer metadata",
  html: `<div class="flex w-full flex-col">
  <div class="chat chat-receiver">
    <div class="chat-avatar avatar avatar-placeholder">
      <div class="bg-secondary text-secondary-content size-10 rounded-full">
        <span class="text-sm">AN</span>
      </div>
    </div>
    <div class="chat-header">Anna <span class="opacity-50">12:45</span></div>
    <div class="chat-bubble">Have a great weekend!</div>
    <div class="chat-footer opacity-50">Delivered</div>
  </div>
  <div class="chat chat-sender">
    <div class="chat-avatar avatar avatar-placeholder">
      <div class="bg-info text-info-content size-10 rounded-full">
        <span class="text-sm">YO</span>
      </div>
    </div>
    <div class="chat-header">You <span class="opacity-50">12:46</span></div>
    <div class="chat-bubble">You too!</div>
    <div class="chat-footer opacity-50">Seen</div>
  </div>
</div>`,
  name: "chat-header-footer",
};
