const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "clapgif",
  category: "🕹 SFW Commands",
  description: "\`Gửi một gif vỗ tay ngẫu nhiên\`",
  usage: "clapgif",
  run: async (client, message, args) => {
    const gifs = require('gifs-pro'); // require package

    const SlapGif = gifs.getClapGif() //slap gif
    const wtf = new Discord.MessageEmbed()
      .setTitle("Vinh đẹp trai bố đời thế")
      .setImage(SlapGif)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(SlapGif);

    message.channel.send(wtf);

  }
};
