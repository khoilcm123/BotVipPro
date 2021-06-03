const Discord = require("discord.js")
    const config = require("../../config.json")
    module.exports = {
    name: "user2",
    aliases: ["info2"],
    category: "⚙️ Utility Commands",
    description: "Get information about a user",
    usage: "userinfo [@USER]",
    run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('\`Vui lòng đề cập đến người dùng mà bạn muốn biết thông tin về\`');

    var playing = ("[ " + user.presence.activities + " ]")
    const who = new Discord.MessageEmbed()
          .setTitle("Thông Tin Người Dùng")
          .addField("Full Username", `\`${user.tag}\``)
          .addField("ID", "\`"+user.id+"\`")
          .addField("Đang chơi","\`"+playing+"\`", true)
          .addField("Trạng thái", `\`${user.presence.status}\``, true)
          .addField("Tham gia discord tại", "\`"+user.createdAt+"\`")
          .setColor(config.colors.yes)
          .setTimestamp().setFooter(client.user.username, config.AVATARURL)
          .setThumbnail(user.avatarURL())
      message.channel.send(who)
    }
    };
