const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "forward",
    category: "🎶 Music Commmands",
    aliases: ["fwd", "for"],
    useage: "forward <DURATION>",
  description: "\`Chuyển tiếp bài hát về phía trước: giây\`",
  run: async (client, message, args) => {
              
              if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
                let isdj=false;
                let leftb = "";
                    if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                        leftb = "❌ \`không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot\`"
                    else
                        for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                                if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                    if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                                leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                        }
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `\`Bạn\' không có quyền cho Lệnh này! Bạn cần có: ${leftb}\``)
                }
                
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "❌\`Không có bài nào đang được phát\`")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌\`Bạn phải tham gia Kênh Voice nào đó\`")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh voice của tôi\`: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
    let queue = client.distube.getQueue(message);
        if(!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "❌ \`Không có bài nào đang được phát\`")

    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Vui lòng thêm số thời gian bạn muốn tua\`")
   
    let seektime2 = queue.currentTime + Number(args[0])*1000;
    if (seektime2 >= queue.songs[0].duration * 1000) { seektime2 = queue.songs[0].duration * 1000 - 1; }
    client.distube.seek(message, Number(seektime2));
    functions.embedbuilder(client, 3000, message, config.colors.yes, "FORWARD!", `\`Đã chuyển tiếp bài hát đến: ${Number(args[0])} giây\``)
    return
  }
  };
  // Vinh đẹp trai bố đời thế 
