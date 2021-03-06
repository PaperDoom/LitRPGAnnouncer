let Parser = require('rss-parser');
let parser = new Parser();

exports.run = async (client, message, args) => {

  try {

    let database = client.mongodb.db('litrpgannouncer').collection('fictions');

    let delURL = args[0].toString();

    let dbFictionLink = await database.findOne({
      link: delURL
    });

    if (dbFictionLink) {

      await database.deleteOne({
        link: delURL
      });

      message.channel.send("Fiction deleted.");

    } else {

      message.channel.send("Fiction doesn't exist in database.");

    }
  } catch (e) {
    console.log(e)
    message.channel.send("Error. Cannont complete action.")
  }
};