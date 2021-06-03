const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "resume",
    category: "🎶 Music Commmands",
    aliases: ["r"],
    useage: "resume",
  description: "\`Tiếp tục bài hát\`",
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
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn không có quyền để sử dụng lệnh này, để sử dụng bạn phải có quyền:\` ${leftb}`)
                }
                
     if (!client.distube.isPaused(message)) return functions.embedbuilder(client, "null", message, config.colors.no, "Not paused!")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " ❌ \`Bạn phải tham gia kênh voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
               
            functions.embedbuilder(client, 3000, message, config.colors.yes, "Resume!")
            return client.distube.resume(message);
  }
  };
