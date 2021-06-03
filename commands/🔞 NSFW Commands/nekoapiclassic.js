const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "nekoapiclassic",
  category: "🔞 NSFW Commands",
  description: "\`Gửi một hình ảnh ngẫu nhiên từ điểm cuối cổ điển neko.life api nsfw\`",
  usage: "nekoapiclassic",
  run: async (client, message, args) => {

  var errMessage = "\`Đây không phải là Kênh NSFW\`";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.classic());

        const nekoapiclassic = new Discord.MessageEmbed()
        .setTitle("Neko.Life API Classic Endpoint")
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(nekoapiclassic);

}

      work();
}
                };
