const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "foxgirl",
      category: "🕹 SFW Commands",
      description: "\`gửi foxgirl ngẫu nhiên\`",
      usage: "foxgirl",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.foxGirl());

            const foxGirl = new Discord.MessageEmbed()
                  .setTitle("🦊 Fox Girl 🦊")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(foxGirl);

      }
};
