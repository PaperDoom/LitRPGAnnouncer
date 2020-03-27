let postChapter = require("./postChapter")

module.exports = async (client, chapter, type) => {

  try {
    let databaseChapters = client.mongodb.db('litrpgannouncer').collection('chapters')
    
    await databaseChapters.insertOne(chapter)
    postChapter(client, chapter, type)

  } catch (e) {
    console.log(e)
  }
}