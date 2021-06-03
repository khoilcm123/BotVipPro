const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "unban",
    category: "⛔️ Moderation Commands",
    description: "\`gỡ cấm một người dùng được đề cập\`",
    usage: "unban <@USER> [REASON]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`${message.author.username} \`bạn không có quyền, bị thiếu\``)
        if (isNaN(args[0])) return message.channel.send("\`Bạn cần cung cấp ID\`")
        let bannedMember = await client.users.fetch(args[0])
    
        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.reply("❌ \`Tôi không có quyền cấm thành viên\`")

       
        let reason = args.slice(1).join(" ")
        if (!reason) reason = "❌ \`Không có lý do nào được đưa ra!\`"

        try {
            message.guild.members.unban(bannedMember, reason).catch(err => console.log(err.toString().red))
            let Sembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`> Bạn đã được bỏ cấm khỏi **${message.guild.name}** bởi vì ${reason}`)
            
            bannedMember.send(Sembed).catch(err => console.log(err.toString().red))
        let embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`✅ **${bannedMember.tag}** bỏ cấm thành công!`)
            
        message.reply(embed).catch(err => console.log(err.red))
        } catch (e) {
            message.channel.send("\`KHÔNG THỂ UNBAND, xin lỗi, đã xảy ra lỗi\`").catch(err => console.log(err.toString().red))
            console.log(e.stack.toString().red)
        }
        
    }
}
