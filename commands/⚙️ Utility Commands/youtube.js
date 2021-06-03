const Discord = require('discord.js');
const he = require('he');
const search = require('youtube-search');
const config= require('../../config.json');

module.exports = {
    name: "youtube",
    aliases: ["yt"],
    category: "⚙️ Utility Commands",
    description: "\`Spam video, channel của youtube mà bạn yêu cầu\`",
    usage: `${config.Prefix}youtube tên channel`,

    run: async (client, message, args) => {

    const apiKey = config.YOUTUBE_API_KEY;
    const videoName = args.join(' ');
    const banned = ["porn", "sex", "fucking", "moaning", "blowjob", "tits", "dick", "sucking", "nigga", "nigger", "pussy", "cock", "boobs", "xvideos", "xnxx", "clits", "naked", "hentai", "horny", "faping", "masturbating", "masturbation", "fuck", "stript", "naked"]  

    if (!videoName) return this.sendErrorMessage("Bạn phải ghi tên video YouTube ra để còn biết mà tìm chứ ?");

    const searchOptions = { maxResults: 1, key: apiKey, type: 'video' };

    if (banned.some(word => message.content.toLowerCase().includes(word))) {
    return message.reply("😳\`Thằng loz ấu dâm tự đi lên google mà tìm douma\`")
    }

    let result = await search(videoName, searchOptions)
      .catch(err => {
        return message.reply("❌\`Bình tĩnh thôi pro thử lại sau vài giây nữa\`");
      });

    result = result.results[0];
    if (!result) 
    return message.reply(`❌ \`T không tìm thấy\` **${videoName}** \`hãy thử tiêu đề youtube khác :))\``);

    const decodedTitle = he.decode(result.title);
    const embed = new Discord.MessageEmbed()
    .setTitle(decodedTitle)
    .setURL(result.link)
    .setThumbnail('https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png')
    .setDescription(result.description)
    .setFooter(`Wibu Bot | yêu cầu bởi: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    .setImage(result.thumbnails.high.url)
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor)

    message.channel.send(embed)
  }
}
