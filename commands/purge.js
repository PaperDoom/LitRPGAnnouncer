exports.run = async (client, message, args) => {

    try {

        let messagecount = parseInt(args[0], 10) ? parseInt(args[0], 10) : 1;

        await message.channel.bulkDelete(messagecount)

    }
    catch (err) {

        if (err) throw err;

    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "prune",
    category: "System",
    description: "Deletes a number of bot messages.",
    usage: "prune [number]"
};