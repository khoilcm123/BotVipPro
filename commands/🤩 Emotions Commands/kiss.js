const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "kiss",
  category: "🤩 Emotions Commands",
  description: "🤭\`hôn một người dùng được đề cập\`",
  usage: "kiss [@User]",
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) message.author;
        

        async function work() {
        let owo = (await neko.sfw.kiss());

        const kissembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn đã được hôn ")
        .setDescription((user.toString() + " bị hôn bởi " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(kissembed);

}

      work();
}
                };
