const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "hug",
  category: "🤩 Emotions Commands",
  description: "Ôm nè",
  usage: "hug [@User]",
  run: async (client, message, args) => {

      let user = message.mentions.users.first();
      if(!user) message.author;
        

        async function work() {
        let owo = (await neko.sfw.hug());

        const hugembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn đã được ôm!")
        .setDescription((user.toString() + " được ôm bởi " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(hugembed);

}

      work();
}
                };
