const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "uptime",
    aliases: ["uptime"],
    category: "🤖 Information Commands",
    description: "\`Xem thời gian hoạt động của BOT\`",
    usage: "uptime",
    run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const uptime = new Discord.MessageEmbed()
    .setTitle(`**Thời gian hoạt động**`)
    .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
    .setTimestamp()
    .setFooter(client.user.username, config.AVATARURL) 
    .setDescription(`:clock1: \`${days} Ngày\` \`${hours} Giờ\` \`${minutes} Phút\` \`${seconds} Giây\``);			
    return message.channel.send(uptime);
    }
}
