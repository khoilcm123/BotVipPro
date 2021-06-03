const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "hboobs",
  category: "🔞 NSFW Commands",
  usage: "hboobs",
  run: async (client, message, args) => {

  //Checks channel for nsfw
  var errMessage = "\`Đây không phải là Kênh NSFW\`";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

  if (!message.channel.nsfw) return message.channel.send('\`Bạn phải sử dụng lệnh này trong phòng chờ nsfw\`') 

  var lo = new Discord.MessageEmbed()
              .setDescription(`Please wait...`)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)

  message.channel.send(lo).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'hboobs'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`[hình ảnh không tải đc? bấm vào đây](${response.body.message})`)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
              .setImage(response.body.message)
          
          m.edit(embed_nsfw);
      });
  });
  
}
};
