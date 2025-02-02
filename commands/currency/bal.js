const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bal",
  aliases: ["money", "credits", "balance"],
  usage: `bal`,
  category: "Currency",
  async execute(message, args, cmd, client) {
    let user = message.mentions.users.first() || args[0] || message.author;
    let userBalance = await client.eco.fetchMoney(user.id ? user.id : user, false);
    const embed = new MessageEmbed()
      .setTitle(`Balance`)
      .addField(`User`, `${user.id ? user : `<@${user}>`}`)
      .addField(`Balance`, `${userBalance} 💸`)
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL)
      .setTimestamp()
    return message.channel.send({ embeds: [embed] })
  }
}
