'use strict';

const _            = require('lodash');
const redis        = require('redis');
const Discord      = require('discord.js');
const logger       = require('./logger');
const express      = require('express');
const level        = require('level');
const levelPromise= require('level-promise');
const sublevel     = require('sublevel');
const request      = require('request-promise');
const P            = require('bluebird');
const colors       = require('colors');

const Command = require('./command');

// TODO build a context at message time so context
// includes message

class Renge {
  constructor(config) {
    this.config = config;
    this.baseApp = express();
    this.db = levelPromise(level("./db"));
    this.commandRegistry = [];
    this.sublevelRegistry = {};
    this.discordClient = new Discord.Client();
  }

  setRootHandler(handler) {
    // TODO Actually implement this
    this.baseApp.get("/", function(req, res) {
      res.send("Oh hello there");
    });
  }

  buildContext(name, dbName) {
    let app = express();
    let newSublevel = (sublevel(this.db, dbName));
    this.sublevelRegistry[dbName] = newSublevel;

    app = express();
    this.baseApp.use(`/${name}`, app);

    return {
      bot: this.discordClient,
      redis: redis.createClient(),
      later: require('later'),
      app: app,
      name: name,
      db: newSublevel,
      dbRegistry: this.sublevelRegistry,
      log: logger(name),
      helpers: {}
    };
  }

  registerCommand(cmdClass, name, dbNamespace) {
    let instName, instDbNamespace;
    instName        = !!name        ? name        : cmdClass.constructor.name;
    instDbNamespace = !!dbNamespace ? dbNamespace : instName;
    
    this.commandRegistry.push(new cmdClass(this.buildContext(instName, instDbNamespace)));
  }

  run() {
    const t = this;
    this.discordClient.on('ready', () => {
      console.log("Bot Ready");
    } );

    this.discordClient.on('message', (msg) => {
      console.log("Message => ".cyan, msg.content);
      _.each(this.commandRegistry, (cmd) => {
        if (cmd.filter(msg)) {
          console.log(`Match => ${cmd.context.name}`.green);
          cmd.process(msg);
        }
      });
    });

    t.baseApp.listen(t.config.port || 1337, function() {
      t.discordClient.login(t.config.botToken, function(err, token) {
        if (err) {
          console.log("ERROR", err);
        }
      });
      console.log("Renge is listening...");
    });
  }
}

module.exports = {
  Rengebot: Renge,
  Command: Command
};