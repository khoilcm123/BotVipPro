const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "bj",
  category: "🔞 NSFW Commands",
  usage: "bj",
  run: async (client, message, args) => {
      if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                description: "\`Bạn có thể sử dụng lệnh này trong Kênh NSFW!\`"
            }})
      }
      var superagent = require('superagent');


    superagent.get('https://nekos.life/api/v2/img/blowjob')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Blowjob")
      .setImage(response.body.url)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setFooter(`Tags: blowjob`)
      .setURL(response.body.url);
  message.channel.send(embed);
    });
}
                };
