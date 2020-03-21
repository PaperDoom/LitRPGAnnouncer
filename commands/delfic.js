let Parser = require('rss-parser');
let parser = new Parser();

exports.run = async (client, message, args) => {

  try {

    let database = client.mongodb.db('litrpgannouncer').collection('fictions');

    let addURL = args[0].toString();

    let addFic = await parser.parseURL(addURL);

    let fictionLink = addFic.link;

    let dbFictionLink = await database.findOne({
      link: fictionLink
    });

    if (dbFictionLink) {

      await database.deleteOne({
        link: addFic.link
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