module.exports = async (client, chapter, type) => {

  try {
    if (type == "royalroad") {
      client.litrpgWebnovelHook.send(`A new chapter has posted **${chapter.title}**!\n${chapter.link}`)
      console.log("Webnovel Chapter Posted: ", chapter.title)
    } else if (type == "goodreads") {
      client.litrpgReviewHook.send(`A new rating/review has been posted for **${chapter.title}**!\n${chapter.link}`)
      console.log("Goodreads Review Posted: ", chapter.title)
    } else if (type == "social") {
      client.litrpgSocialHook.send(`Check out this new thing that was just posted: **${chapter.title}**\n${chapter.link}`)
      console.log("Social Item Posted: ", chapter.title)
    }
    else {
      client.litrpgSocialHook.send(`Check out this new thing that was just posted: **${chapter.title}**\n${chapter.link}`)
    }

    //client.treehouseHook.send(`A new chapter of **${chapter.title}** has posted!\n${chapter.link}`) ;


  } catch (e) {
    console.log(e)
  }
}