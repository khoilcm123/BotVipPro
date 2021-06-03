const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "kick",
    category: "⛔️ Moderation Commands",
    description: "\`kíck thành viên ra khỏi server\`",
    usage: "kick <@USER> [LÝ DO]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`${message.author.username} \`bạn không có quyền hoặc quyền bị thiếu\``)

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        console.log(banMember)
        
        if (!banMember) return message.reply(`${message.author.username} \`hãy gắn thẻ ( tag )  một thành viên để đá họ!\``)
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "\`Không có lý do kick\`"
    
        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.reply("❌ \`Tôi không có quyền để đá thành viên!\`")
    
        let Sembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`> Bạn đã bị đuổi khỏi ${message.guild.name} bởi vì ${reason}`)
        let i = 0;
        banMember.send(Sembed).catch(err => console.log(err.toString().red))
        banMember.kick(banMember, reason).catch(err => {
            console.log(err.toString().red)
            i++
           }).then(
               ()=>{
                let embed = new Discord.MessageEmbed()
                .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setDescription(`✅ ${banMember.user.tag} \`đã đá thành công!\``)
                if(i==1)
                return message.reply("bạn không có quyền để thực hiện lệnh này")
                message.reply(embed).then(msg => {
                    msg.delete({timeout: 10000});
                })
               }
           )
        
    
        
    }
}
