const Discord = require('discord.js');
const config = require('../../config.json');
const log = require('../../assets/json/channels.json');

module.exports = {
    name: "phanhoi",
    category: "🇻🇳 ",
    description: "\`cung cấp cho vinh một phản hồi để có thêm ý kiến nâng cấp bot \`",
    example: `${config.Prefix}phanhoi nâng cấp bot `,

    run: async (client, message, args) => {

    const Channel = message.client.channels.cache.get(log.Feeback);

    if (!args[0]) 
    return message.reply(`Vui lòng cung cấp phản hồi để gửi để chúng tôi có thể xem xét !! **\`${config.Prefix}feedback [Your feedback]\`**`);

    let feedback = message.content.slice(message.content.indexOf(args[0]), message.content.length);

    const Embed = new Discord.MessageEmbed()
      .setTitle('__PHẢN HỒI__')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(feedback) 
      .addField('Tên', `\`${message.member.user.tag}\` | \`${message.member.id}\``)
      .addField('Tên server', `\`${message.guild.name}\` | \`${message.guild.id}\``)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    Channel.send(Embed);

    await message.channel.send(`💯 \`đã gửi phản hồi đến cho vinh đẹp trai bố đời!\``)
    }
}
