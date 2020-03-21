exports.run = async (client, message, args) => {

    try {

        let messagecount = parseInt(args[0], 10) ? parseInt(args[0], 10) : 1;
        let messages = await message.channel.messages.fetch({ limit: 100 });
        let msg_array = messages.array();

        msg_array = msg_array.filter(m => m.author.id === client.user.id);
        msg_array.length = messagecount;
        msg_array.map(m => m.delete().catch(console.error));

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