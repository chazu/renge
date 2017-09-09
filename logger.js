let _ = require('lodash');
let pad = require('pad');

let registeredModules = [];

let tagLength = 0;


function logger(commandName) {
  registeredModules.push(commandName);
  tagLength = Math.max(_.map(registeredModules, (x) => x.length));

  function tag() {
    return "[" + pad(tagLength, commandName) + "]";
  }

  return function(msg) {
    console.log(tag() + " " + msg);
  };
}

module.exports = logger;
