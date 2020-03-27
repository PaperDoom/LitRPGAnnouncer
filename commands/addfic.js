let Parser = require('rss-parser');
let parser = new Parser();

exports.run = async (client, message, args) => {

  try {
    if (args.length == 0) {
      message.channel.send("Failed. Needs valid RSS link.")
      return
    }
    let databaseFictions = client.mongodb.db('litrpgannouncer').collection('fictions');
    let databaseChapters = client.mongodb.db('litrpgannouncer').collection('chapters');

    let addURL = args[0].toString();

    if (!args[1]) {
      message.channel.send("Failed. You need to add a type after the url.")
      return
    }
    
    let urlType = args[1].toString();

    let addFic = await parser.parseURL(addURL);

    if (!addFic.title) {
      message.channel.send("Can't add fiction. The fiction doesn't have any chapters in RSS: ", addFic.title)
      return
    }

    let fictionLink = addFic.link;

    let dbFictionLink = await databaseFictions.findOne({
      link: fictionLink
    });

    if (!dbFictionLink) {

      await databaseFictions.insertOne({
        title: addFic.title,
        link: addFic.link,
        type: urlType
      });

      await databaseChapters.insertMany(addFic.items);

      message.channel.send("Fiction added.");

    } else {

      message.channel.send("Fiction already tracked.");

    }
  } catch (e) {
    console.log(e)
    message.channel.send("Error. Cannont complete action.")
  }
};