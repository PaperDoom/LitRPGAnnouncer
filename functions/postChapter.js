module.exports = async (client, chapter) => {

  try {

    client.treehouseHook.send(`A new chapter of **${chapter.title}** has posted!\n${chapter.link}`) ;
    client.litrpgHook.send(`A new chapter of **${chapter.title}** has posted!\n${chapter.link}`)
    
    console.log("Chapter Posted: ", chapter.title)
  } catch (e) {
    console.log(e)
  }
}