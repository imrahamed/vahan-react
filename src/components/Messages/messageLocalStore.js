const messageLocalStore = {
  get() {
    const messages = JSON.parse(localStorage.getItem('msgList') || '[]');

    if (Array.isArray(messages)) {
      return messages;
    }

    return [];
  },
  set(messagesList) {
    localStorage.setItem('msgList', JSON.stringify(messagesList));
  },
  push(newMessage) {
    const messages = this.get();

    messages.push(newMessage);
    this.set(messages);
  }
};

export default messageLocalStore;