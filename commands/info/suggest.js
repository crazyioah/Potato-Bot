const Discord = require('discord.js')
module.exports = {
  name: 'suggest',
  description: 'suggest',
  usage: '<suggestion>',
  category: "Info",
  async execute(message, args) {
    if(args == []){
      message.reply("you didn\'t provide any arguments");
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`New Suggestion`)
      .setDescription(args.join(' '))
    let channel = message.guild.channels.cache.find(channel => channel.name.includes("suggest"))
    if (!channel) {
      message.reply("there is no channel named suggest")
      channel = await message.channel.guild.channels.create('suggest', {
        type: 'text',
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: message.guild
              .roles.cache.find(role => role.name.toLowerCase() === 'suggest')
              .id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
      })
    }
    channel.send({ embeds: [embed] });
  }
}