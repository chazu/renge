'use strict';
const Handlebars = require('handlebars');
const fs         = require('fs');

class Command {

  constructor(context) {
    context.log("Registering...");
    this.context = context;
    context.templates = [];
    this.subCommandMap = {};
  }

  mountSubCommand(matcher, command) {
    this.subCommandMap[matcher] = command;
  }

  tick() {
    // Handle scheduled jobs based on redis job state
    throw "Must be implemented by subclass!";
  }

  // Assumes user is using our Message class to wrap discordJS messages
  triggerSubCommand(message) {
    return this.subCommandMap[message.head](message.popHead);
  }

  filter(command) {
    // Return true/false to indicate whether command should be processed
    throw "Must be implemented by subclass!";    
  }

  process(message) {
    this.context.message = message;
  }

  useTemplate(name) {
    let text = fs.readFileSync(`${this.context.name}/${name}.handlebars`);
    this.context.templates[name] = Handlebars.compile(text);
  }

  // TODO Deprecated - Remove this in future release
  splitCmd(string) {
    console.log("Command#splitCmd is DEPRECATED");
    return string.split(' ');
  };
}

module.exports = Command;
