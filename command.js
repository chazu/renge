'use strict';
const Handlebars = require('handlebars');
const fs         = require('fs');
const Message    = require('./message');

class Command {

  constructor(context) {
    console.log("Registering...");
    this.context = context;
    this.templates = [];
    this.subcommands = {};
  }

  tick() {
    // Handle scheduled jobs based on redis job state
    throw "Must be implemented by subclass!";
  }

  filter(command) {
    // Return true/false to indicate whether command should be processed
    throw "Must be implemented by subclass!";    
  }

  dispatch(message) {
    // TODO The subcomand shouldn't have to peel
    // its own command off of the message - dispatch
    // should handle that, right?
    let forSub = message.messageFromTail();
    let subCommandInstance = new this.subcommands[forSub.head];
    return subCommandInstance.process(forSub);
  }
  
  process(message) {
    if (typeof message === Message) {
      this.dispatch();
    };
  }

  registerTemplate(template, name) {
    this.templates[name] = template;
  }

  // DEPRECATED - in here for BC but should be redundant
  // since we now have Message class.
  splitCmd(string) {
    return string.split(' ');
  };

  registerSub(command, name) {
    this.subcommands[name] = command;
  }
}

module.exports = Command;
