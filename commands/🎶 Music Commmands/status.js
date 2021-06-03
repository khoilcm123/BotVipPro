const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "status",
    category: "🎶 Music Commmands",
    useage: "status",
    aliases: ["settings"],
  description: "\`Hiển thị trạng thái/cài đặt hàng đợi\`",
  run: async (client, message, args) => {
    
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "\`Không có bài nào được phát\`")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " \`Bạn phải tham gia Kênh voice nào đó\`")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          

    let queue = client.distube.getQueue(message);
    if (!queue) return functions.embedbuilder(client, "null", message, config.colors.no, "\`Không có bài nào đuợc phát\`");

    return message.channel.send(functions.curembed(client, message));
  }
  };
