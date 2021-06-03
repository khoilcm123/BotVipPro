const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "slowmode",
    category: "⛔️ Moderation Commands",
    description: "\`Đặt SLOWMODE cho server này\`",
    usage: "[COMMAND] + [USER]",
    run: async (client, message, args) => {

     if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`${message.author.username} \`Bạn không có quyền hoặc bị thiếu!\``)

        if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
              let embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setDescription(`✅ Chế độ làm chậm được đặt thành công cho ${args[0]}!`)
                
            message.reply(embed)
            message.channel.setRateLimitPerUser(args[0])
        } else {
            let embed2 = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setDescription(`Đó không phải là một con số`)
                
            message.reply(embed2)
        }

    }
}
