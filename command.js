'use strict';
const Handlebars = require('handlebars');
const fs         = require('fs');

class Command {

  constructor(context) {
    context.log("Registering...");
    this.context = context;
    context.templates = [];
  }

  tick() {
    // Handle scheduled jobs based on redis job state
    throw "Must be implemented by subclass!";
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

  splitCmd(string) {
    return string.split(' ');
  };
}

module.exports = Command;
