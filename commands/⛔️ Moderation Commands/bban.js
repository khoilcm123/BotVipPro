const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "bban",
    category: "⛔️ Moderation Commands",
    description: "\`cấm một người dùng được đề cập\`",
    usage: "ban <@USER> [REASON]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`${message.author.username}, \`bạn không có quyền để ban người khác\`!`)

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        console.log(banMember)
        
        if (!banMember) return message.reply(`${message.author.username},\`Bạn hãy tag người bạn muốn ban để tôi còn biết mà ban chứ:))\``)
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "no reason"
    
        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.reply("\`Tôi không có quyền cấm thành viên trong server\`")
    
        let Sembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`\`Bạn đã bị ban ${message.guild.name} vì ${reason}. Bạn bị cấm vĩnh viễn\``)
        let i = 0;
        banMember.send(Sembed).catch(err => console.log(err.toString().red))
        banMember.ban(banMember, reason).catch(err => {
            console.log(err.toString().red)
            i++
           }).then(
               ()=>{
                let embed = new Discord.MessageEmbed()
                .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setDescription(`✅ \`${banMember.user.tag} ban thành công!\``)
                if(i==1)
                return message.reply("\`BỎ GIẤY PHÉP ĐỂ BAN\`")
                message.reply(embed).then(msg => {
                    msg.delete({timeout: 10000});
                })
               }
           )
        
    
        
    }
}
