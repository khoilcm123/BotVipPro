const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "autoplay",
    category: "🎶 Music Commmands",
    aliases: ["ap","randomsong"],
    useage: "autoplay",
  description: "Cho phép tự động phát - các bài hát tương tự ngẫu nhiên!",
  run: async (client, message, args) => {
        //CHECK IF DJ LOL
        if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
          let isdj=false;
          let leftb = "";
              if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                  leftb = "không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot!"
              else
                  for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                          if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                              if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                          leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                  }
              if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `Bạn không có quyền để sử dụng Lệnh này! Bạn cần có:\` ${leftb}`)
          }
          //CHECK IF DJ LOL
  if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "không có gì để phát!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "Bạn phải tham gia Kênh thoại!")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh Voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)  
    await functions.embedbuilder(client, 3000, message, config.colors.yes, `Autoplay is now on ${client.distube.toggleAutoplay(message) ? "ON" : "OFF"}!`)
    return;
  }
};

// Wibu Bot 
