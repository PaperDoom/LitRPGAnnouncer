
let checkChapters = require("./checkChapters")

module.exports = async (client) => {

  try {
    
    let databaseFictions = client.mongodb.db('litrpgannouncer').collection('fictions')

    let fictionList = await databaseFictions.find().toArray()

    if (!fictionList) {
      console.log("No fictions found. Ending Function Iterator.")
    }
    
    for (let fiction of fictionList) {
      checkChapters(client, fiction.link, fiction.type)

    }
  } catch (e) {
    console.log(e)
  }
}