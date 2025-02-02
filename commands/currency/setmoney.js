const {admins} = require("../../config.json")
module.exports = {
  name: "setmoney",
  usage: "setmoney @user <amount>",
  category: "Currency",
  async execute(message, args, cmd, client, Discord) {
    if (!admins.includes(message.author.id)) return; // return if author isn't bot owner
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Please specify a user!");
    let amount = parseInt(args[1]);
    if (!amount || isNaN(amount)) return message.reply("Please specify a valid amount.");
    let data = await client.eco.setMoney(user.id, false, amount);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Money Added!`)
      .setDescription(`User: <@${user.id}>\nTotal Amount: ${data}`)
      .setColor("RANDOM")
    return message.channel.send({ embeds: [embed] })
  }
}