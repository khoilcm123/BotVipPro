const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "addrelated",
    category: "🎶 Music Commmands",
    cooldown: 3, 
    aliases: ["✔️", "related", "addsimilar", "similar"],
    useage: "addrelated",
  description: "\`Thêm một bài hát tương tự của Bản nhạc hiện tại\`",
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
              if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn\' không có quyền cho Lệnh này! Bạn cần phải có:\` ${leftb}`)
          }
          //CHECK IF DJ LOL
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Không có bài nào đang được phát!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh Voice nào đó\`")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Bạn phải tham gia Kênh Voice của tôi: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)  
    let newsong = await client.distube.addRelatedVideo(message);
          let result = newsong.songs;
          functions.embedbuilder(client, 10000, message, config.colors.yes, "Thêm:", `[${result[1].name}](${result[1].url})`, result[1].thumbnail)
          return client.distube.play(message, result[1].url)
    return;
  }
};

// Vinh đẹp trai bố đời thế 
