const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "spank",
  category: "🔞 NSFW Commands",
  description: "\`đánh đòn một người dùng được đề cập\`",
  usage: "[command] + [user]",
  run: async (client, message, args) => {
  var errMessage = "\`Đây không phải là Kênh NSFW\`";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
        const user = message.mentions.users.first();
        if(!user)
        return message.reply('\`Đề cập đến ai đó để mút\`');

        async function work() {
        let owo = (await neko.nsfw.spank());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " Bạn đã bị múc khô máu! ")
        .setDescription((user.toString() + " đã bị múc khô máu bởi " + message.author.toString() + "!"))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(cuddleembed);

}

      work();
}
                };
