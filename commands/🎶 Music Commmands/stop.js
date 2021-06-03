const functions = require("../../functions");
const config = require("../../config.json")
module.exports = {
    name: "stop",
    category: "🎶 Music Commmands",
    aliases: ["leave"],
    useage: "< prefix > stop",
  description: "\`Dừng phát nhạc và rời khỏi kênh\`",
  run: async (client, message, args) => {
              //CHECK IF DJ LOL
              if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
                let isdj=false;
                let leftb = "";
                    if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                        leftb = "không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot"
                    else
                        for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                                if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                    if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                                leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                        }
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ Bạn không có quyền cho Lệnh này! Bạn cần phải có: ${leftb}`)
                }
                //CHECK IF DJ LOL
     if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ Bạn phải tham gia Kênh voice nào đó")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ Bạn phải tham gia Kênh voice của tôi: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          
    functions.embedbuilder(client, "null", message, config.colors.no, "🤧", `OKE tôi đi đây bye bye`)
    try {
        client.distube.stop(message);
    } catch {
    }
    try {
         message.member.voice.channel.leave();
    } catch (error) {
    }
  }
  };
