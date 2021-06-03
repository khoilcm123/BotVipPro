const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    
    name: "avatarserver",
    aliases: ["guildicon", "avtsv"],
    description: "🎉\`Hiển thị avtar của server\`",
    category: "⚙️ Utility Commands",
    usage: "!avtsv",

    run: async (client, message, args) => {
        
        const embed = new Discord.MessageEmbed()

        .setTitle(`AVARTAR CỦA ${message.guild.name}`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setFooter(`Bot made in Nguyễn vinh | yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)

        message.channel.send(embed)
    }
}
