const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "goose",
  category: "🕹 SFW Commands",
  description: "\`gửi hình ảnh ngỗng ngẫu nhiên\`",
  usage: "goose",
  run: async (client, message, args) => {
    let owo = await neko.sfw.goose();
    const goose = new Discord.MessageEmbed()
      .setTitle("🦆 Quạc Quạc 🦆")
      .setImage(owo.url)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(owo.url);
    message.channel.send(goose);
  }
};
