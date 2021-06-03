const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "vote",
    category: "⛔️ Moderation Commands",
    description: "\`Tạo một cuộc thăm dò ( vote )\`",
    usage: "poll <POLLTEXT>",
    run: async (client, message, args) => {

         if (!args[0]) return message.reply('\`Nhập câu hỏi cho cuộc thăm dò\`');
        //trime slice join
        let msg = args.slice(0).join(' ');
        //poll embed
        let embed = new Discord.MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setAuthor(`📋 | ${message.guild.name}`)
          .addField("\u200b",msg)
         .setFooter(`Từ: ${message.author.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
        //temp message
        let tempmsg = await message.channel.send(new Discord.MessageEmbed().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL));
        //Command löschen
        await message.delete();
        //mit yes reagieren
        await tempmsg.react("✅");
        //mit no reagieren
        await tempmsg.react("❌");
        //Poll erstellen
        await tempmsg.edit(embed);
    }
}
