let postChapter = require("./postChapter")

module.exports = async (client, chapter) => {

  try {
    let databaseChapters = client.mongodb.db('litrpgannouncer').collection('chapters')
    
    await databaseChapters.insertOne(chapter)
    postChapter(client, chapter)

  } catch (e) {
    console.log(e)
  }
}