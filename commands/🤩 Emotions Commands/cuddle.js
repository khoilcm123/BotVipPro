const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

const config = require("../../config.json")

module.exports = {
  name: "auyem",
  aliases:["cuddle"],
  category: "🤩 Emotions Commands",
  description: "\`âu yếm một người dùng được đề cập\`",
  usage: "cuddle [@USER]",
  run: async (client, message, args) => {
        let user = message.mentions.users.first();
        if(!user) message.author;
        

        async function work() {
        let owo = (await neko.sfw.cuddle());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn được nhận 1 cái âu yếm")
        .setDescription((user.toString() + " nhận được một cái âu yếm từ " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(cuddleembed);

}

      work();
}
                };
