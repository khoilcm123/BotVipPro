const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "neko",
      category: "🕹 SFW Commands",
      description: "\`gửi ngẫu nhiên cô gái neko dễ thương\`",
      usage: "neko",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.neko());

            const nekoe = new Discord.MessageEmbed()
                  .setTitle("👸 neko girl 👸")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(nekoe);
      }
};
