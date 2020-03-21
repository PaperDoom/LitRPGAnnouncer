const fs = require('fs')
exports.run = (client, config, message) => {
  if (message.author.id === client.user.id) return;
  if (!message.content.startsWith(config.Prefix)) return

  const args = message.content.slice(config.Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    if (!fs.existsSync(`${__dirname}/../commands/${command}.js`)) {
      message.channel.send("Unknown command.")
      return
    }
    let commandFile = require(`${__dirname}/../commands/${command}.js`);
    commandFile.run(client, message, args);

  } catch (err) {
    console.error(err);
  };
}