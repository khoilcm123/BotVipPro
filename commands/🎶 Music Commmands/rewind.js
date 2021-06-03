const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "rewind",
    category: "🎶 Music Commmands",
    aliases: ["rew"],
    useage: "rewind <DURATION>",
  description: "\`Tua lại bài hát: giây\`",
  run: async (client, message, args) => {
              //CHECK IF DJ LOL
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
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn không có quyền để sử dung lệnh này, để sử dụng bạn cần phải có quyền: ${leftb}\``)
                }
    //CHECK IF DJ LOL
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn cần tham gia kênh voice nào đó\`")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " ❌ \`Bạn cần tham gia kênh voice của tôi\`: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
    let queue = client.distube.getQueue(message);
        if(!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "\`Không có bài nào được phát\`")

    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Vui lòng thêm số bạn muốn tua lại\`")
   
    let seektime = queue.currentTime - Number(args[0])*1000;
    if (seektime < 0) seektime = 0;
    if (seektime >= queue.songs[0].duration-queue.currentTime) { seektime = 0; }
    client.distube.seek(message, Number(seektime));
    functions.embedbuilder(client, 3000, message, config.colors.yes, "REWIND!", `\`Đã tua lại bài hát cho: ${args[0]} giây\``)
    return
  }
  };
