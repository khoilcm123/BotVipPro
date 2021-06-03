const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "replay",
    category: "🎶 Music Commmands",
    aliases: ["restart"],
    useage: "replay",
  description: "\`Phát lại bài hát hiện tại\`",
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
                if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn không có quyền để sử dụng lệnh này, để sử dụng bạn cần có quyền: ${leftb}\``)
            }
            
            if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh voice nào đó\`")
            
            if (!client.distube.isPlaying(message)) {
              return functions.embedbuilder(client, 5000, message, config.colors.yes, "ERROR", "\`Không có bài nào được phát\`")
            }
            let queue = client.distube.getQueue(message);
            if (!queue) return embedbuilder("null", message, config.colors.no, "\`Không có bài nào được phát\`");

            let cursong = queue.songs[0];
            if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Bạn phải tham gia Kênh voice của tôi: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
            functions.embedbuilder(client, 5000, message, config.colors.yes, "Replaying current song:", `[${cursong.name}](${cursong.url})`, cursong.thumbnail)
    
            return client.distube.playSkip(message, cursong.url);
  }
};
