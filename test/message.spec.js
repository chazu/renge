let chai = require('chai');
let Message = require('./../message');
let expect = chai.expect;

let discordJSMessage;

describe('Message', () => {

  describe('constructor', () => {
    beforeEach(() => {
      discordJSMessage = {
        content: 'tama block info'
      };
    });

    it('should split the messages content if no second arg', () => {
      let testMessage = new Message(discordJSMessage);

      expect(testMessage.parsed.length).to.equal(3);
    });

    it('should use the passed-in parsed message if second arg present', () => {
      let testMessage = new Message(discordJSMessage, ['block', 'info']);

      expect(testMessage.parsed.length).to.equal(2);
    });

    it('should handle extra spaces between tokens', () => {
      discordJSMessage.content = 'tama  block   info';

      let testMessage = new Message(discordJSMessage);

      expect(testMessage.parsed.length).to.equal(3);
      expect(testMessage.parsed[0]).to.equal('tama');
      expect(testMessage.parsed[1]).to.equal('block');
      expect(testMessage.parsed[2]).to.equal('info');
    });
  });

  describe('head', () => {
    it('should return the first token', () => {
      let testMessage = new Message(discordJSMessage);

      expect(testMessage.head).to.equal('tama');
    });
  });

  describe('tail', () => {
    it('should return the rest of the tokens', () => {
      let testMessage = new Message(discordJSMessage);

      expect(testMessage.tail).to.deep.equal(['block', 'info']);
    });
  });

  describe('wrappedMessage', () => {
    it('should return a copy of the internally wrapped message', () => {
      let testMessage = new Message(discordJSMessage);

      expect(testMessage.wrappedMessage).to.not.equal(discordJSMessage);
      expect(testMessage.wrappedMessage.content).to.equal(discordJSMessage.content);
    });
  });

  describe('messageFromTail', () => {
    it('should instantiate a new Message', () => {
      let testMessage = new Message(discordJSMessage);

      let forSubCommand = testMessage.messageFromTail();
      expect(forSubCommand).to.be.an.instanceof(Message);
      expect(forSubCommand).not.to.equal(testMessage);
      expect(forSubCommand.parsed).to.deep.equal(['block', 'info']);
    });
  });
});
