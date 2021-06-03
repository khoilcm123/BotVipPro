const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "lewdnekogif",
  category: "🔞 NSFW Commands",
  description: "\`Gửi nsfw neko gfi ngẫu nhiên\`",
  usage: "lewdnekogif",
  run: async (client, message, args) => {

  var errMessage = "Đây không phải là Kênh NSFW";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.nekoGif());

        const lewdnekogif = new Discord.MessageEmbed()
        .setTitle("NSFW Neko Gif")
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(lewdnekogif);

}

      work();
}
                };
