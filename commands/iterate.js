let fictionIterator = require('../functions/fictionIterator.js')

exports.run = async (client, message, args) => {

  try {

    fictionIterator(client)

  } catch (e) {
    console.log(e)

  }
};