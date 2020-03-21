exports.run = (client, config, error) => {
  console.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
}