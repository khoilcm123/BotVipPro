const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "anal",
  category: "🔞 NSFW Commands",
  usage: "anal",
  run: async (client, message, args) => {

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
              .setDescription(`Vui lòng đợi... `)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)

  message.channel.send(lo).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'anal'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`[hình ảnh không tải? bấm vào đây](${response.body.message})`)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
              .setImage(response.body.message)
          
          m.edit(embed_nsfw);
      });
  });
  
}
};
