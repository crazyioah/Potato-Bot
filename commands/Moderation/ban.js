module.exports = {
    name: 'ban',
    description: "This command bans a member!",
    permissions: 'BAN_MEMBERS',
    guildOnly: true,
    category: "Moderation",
    async execute(message, args, cmd, client, Discord) {
        //initialize
        var channel = message.guild.channels.cache.find(channel => channel.name.includes("mod"));
        var user = message.mentions.members.first();
        var reason = args[args.length - 1];

        //conditions
        if (!user) return message.channel.send("You have to mention a valid member");
        if (!channel) {
            message.channel.send("There's no channel that includes `mod` in their name, creating the channel");
            //create channel
            channel = await message.guild.channels.create("modlogs", {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: message.guild.roles.cache.find(
                            (role) => role.name.toLowerCase().includes("mod")
                        ),
                        allow: ["VIEW_CHANNEL"],
                    },
                ],
            });
        }
        if (reason == user || !reason) { reason = "No reason given"; }

        //kick
        var banEmbed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .addField("Banned user", `${user}`)
            .addField("Reason", `${reason}`)
            .setFooter({ text: `Banned by ${message.author.tag}` })
            .setTimestamp();
        user.ban();
        channel.send({ embeds: [banEmbed] });
    }
}