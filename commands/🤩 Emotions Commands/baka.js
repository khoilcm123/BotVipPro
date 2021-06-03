const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "baka",
  category: "🤩 Emotions Commands",
  description: "\`kẻ ngốc\`",
  usage: "baka [@USER]",
  run: async (client, message, args) => {
        const user = message.mentions.users.first();
        if(!user)
        return message.reply('Đề cập đến ai đó');

        async function work() {
        let owo = (await neko.sfw.baka());

        const baka = new Discord.MessageEmbed()
        .setTitle(" IDIOT! ")
        .setDescription((" BAKA!!! " + user.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(baka);

}

      work();
}
};
