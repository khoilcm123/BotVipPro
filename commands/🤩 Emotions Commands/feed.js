const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "feed",
  category: "🤩 Emotions Commands",
  description: "\`cung cấp cho một người dùng được đề cập\`",
  usage: "feed [@User]",
  run: async (client, message, args) => {

        let user = message.mentions.users.first();
        if(!user) user = message.author;
        

        async function work() {
        let owo = (await neko.sfw.feed());

        const feedembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn đã được cho ăn! ")
        .setDescription((user.toString() + " được cho ăn bởi " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(feedembed);

}

      work();
}
                };
