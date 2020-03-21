const config = require("./config")
const Discord = require("discord.js");
const client = new Discord.Client();

const litrpgHook = new Discord.WebhookClient(config.Webhooks.litrpg.id, config.Webhooks.litrpg.token)
const treehouseHook = new Discord.WebhookClient(config.Webhooks.treehouse.id, config.Webhooks.treehouse.token)

const fs = require("fs");

let MongoClient = require('mongodb').MongoClient;

async function init() {

  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, config, ...args));
      delete require.cache[require.resolve(`./events/${file}`)]
    });
  });

  MongoClient.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, async (err, db) => {
    if (err) return console.log(err);
    client.mongodb = db;
    client.login(config.Token.Treehouse)
    //client.testhook = testhook
    client.litrpgHook = litrpgHook
    client.treehouseHook = treehouseHook
  })
}

init()