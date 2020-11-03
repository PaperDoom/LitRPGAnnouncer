let addChapter = require("./addChapter")
let Parser = require('rss-parser');
let parser = new Parser();

module.exports = async (client, link, type) => {

  try {
    let databaseChapters = client.mongodb.db('litrpgannouncer').collection('chapters')
    let databaseFictions = client.mongodb.db('litrpgannouncer').collection('fictions')

    let rssFeed = await parser.parseURL(link);
    
    if (!rssFeed.title) {

      databaseFictions.deleteOne({link: rssFeed.link})
      console.log("Deleting fiction because no chapters in RSS: ", rssFeed.title)
      return

    }

    let rssChapters = rssFeed.items
    
    rssChapters.sort(function(a, b) {
      let keyA = new Date(a.isoDate) ; 
      let keyB = new Date(b.isoDate) ;
      if (keyA < keyB) return -1 ;
      if (keyA > keyB) return 1 ;
      return 0 ;
    }) ;

    for (let chapter of rssChapters) {

      let dbGUID = await databaseChapters.findOne({
        guid: chapter.guid
      });

      if (!dbGUID) {
        await addChapter(client, chapter, type)
      }
    }
  } catch (e) {

    if (e = "Error: Status code 404") {

      console.log("Error: 404\nCheck link: " + link)
      
    } else {
      console.log(e)
    }
  }
}