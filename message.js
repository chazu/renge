class Message {
  'tama wallet addr'
  constructor(msg, next = null) {
    this._message = msg;

    // If the caller passes in next parsed command (presumably
    // with the head popped off) then set parsed command like so,
    // because we're being passed down to a sub-command
    this._parsedCommand = next ? next : msg.content.split(/\s+/);
    
  }

  get wrappedMessage() {
    // Return a copy of the original message
    return Object.assign({}, this._message);
  }

  get head() {
    let [head, ...tail] = this.parsed;
    return head;
  }
 
  get tail() {
    let [head, ...tail] = this.parsed;
    return tail;
  }

  get parsed() {
    return this._parsedCommand;
  }

  messageFromTail() {
    let [head, ...tail] = this.parsed;
    return new Message(this._message, tail);
  }
}

module.exports = Message;
