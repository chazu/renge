const chai = require('chai');
const Message = require('./../message');
const expect = chai.expect;

const Command = require('./../command');

describe('Command', () => {

  describe('constructor', () => {
  });

  describe('process', () => {
  });

  describe('registerSub', () => {
    it('should add a command to the subcommands object', () => {
      let topCommand = new Command({});
      let subcommand = new Command({});

      topCommand.registerSub(subcommand, 'sub');

      expect(topCommand.subcommands['sub']).to.equal(subcommand);
    });
  });

  describe('registerTemplate', () => {
    it('should add a template to the template object', () => {
      let command  = new Command({});
      let template = "<html>Derp</html>";
      
      command.registerTemplate(template, 'derp');

      expect(command.templates['derp']).to.equal(template);
    });
  });
});
