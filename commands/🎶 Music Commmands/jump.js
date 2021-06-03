const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "jump",
    cooldown: 5, 
    category: "🎶 Music Commmands",
    aliases: ["skipto"],
    useage: "jump <Query number>",
  description: "\`Chuyển đến một bài hát trong Hàng đợi\`",
  run: async (client, message, args) => {
    
    if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
    let isdj=false;
    let leftb = "";
        if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
            leftb = "Không tìm thấy kênh!"
        else
            for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                    if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                        if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                    leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }
        if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `\`Bạn\' không có quyền cho lệnh này, bạn cần phải có quyền: ${leftb}\``)
    }
    
     if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "❌ \`Không có bài nào được phát\`")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice nào đó\`")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh voice của tôi\`: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          

     if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Vui lòng thêm nội dung bạn muốn tìm kiếm \`")

    let queue = client.distube.getQueue(message);
    if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Không có bài nào được phát!");

    if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
        functions.embedbuilder(client, 3000, message, config.colors.yes, "SUCCESS", `✔️ \`Đã nhảy ${parseInt(args[0])} bài hát\``)
        return client.distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("\`Số bài hát không hợp lệ\`"));
    }
    else {
        return functions.embedbuilder(client, 3000, message, config.colors.no, "ERROR", `🤧 \`Vui lòng sử dụng một số từ 0  đến: ${DisTube.getQueue(message).length} | (0: tắt, 1: Lặp lại một bài hát, 2: Lặp lại tất cả hàng đợi)\``)
    }
  }
  };

 // Wibu Bot 
