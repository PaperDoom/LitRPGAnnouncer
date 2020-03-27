const config = require("./config")
const Discord = require("discord.js");
const client = new Discord.Client();

const litrpgWebnovelHook = new Discord.WebhookClient(config.Webhooks.litrpgWebnovel.id, config.Webhooks.litrpgWebnovel.token)
const litrpgSocialHook = new Discord.WebhookClient(config.Webhooks.litrpgSocial.id, config.Webhooks.litrpgSocial.token)
const litrpgReviewHook = new Discord.WebhookClient(config.Webhooks.litrpgReview.id,config.Webhooks.litrpgReview.token)
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
    client.litrpgWebnovelHook = litrpgWebnovelHook
    client.litrpgSocialHook =litrpgSocialHook
    client.litrpgReviewHook =litrpgReviewHook
    client.treehouseHook = treehouseHook
  })
}

init()