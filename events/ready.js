let fictionIterator = require('../functions/fictionIterator.js')

exports.run = (client) => {
  console.log("Litrpg Announcer Online!");
  setInterval(() => {
    fictionIterator(client)
  }, 600000)
}