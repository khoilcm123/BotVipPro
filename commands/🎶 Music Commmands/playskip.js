const functions = require("../../functions")

const config = require("../../config.json")
module.exports = {
    name: "playskip",
    category: "🎶 Music Commmands",
    aliases: ["ps"],
    useage: "playskip <URL/NAME>",
  description: "\`Phát bài hát mới và bỏ qua bài hát hiện tại\`",
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
                if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `\`Bạn\' không có quyền để sử dụng lệnh này, để sử dụng bạn phải có quyền: ${leftb}\``)
            }
            //CHECK IF DJ LOL
     if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice nào đó\`")
            if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "🎶 \`Vui lòng thêm một cái gì đó mà bạn muốn tìm kiếm\`")

            if (!client.distube.isPlaying(message)) {
              functions.embedbuilder(client, 5000, message, config.colors.yes, "Searching!", "```" + args.join(" ")+ "```")
              return client.distube.play(message, args.join(" "));
            }
            if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
            functions.embedbuilder(client, 5000, message, config.colors.yes, "ĐANG TÌM KIẾM VÀ BỎ QUA BÀI HIỆN TẠI!", "```" + args.join(" ")+ "```")
            if(args.join(" ").includes("track") && args.join(" ").includes("open.spotify")){
              let info = await getPreview(args.join(" "));
              return client.distube.playSkip(message, info.artist + " " + info.title);
            }
            else  if(args.join(" ").includes("playlist")){
              return message.reply("\`Danh sách phát không được hỗ trợ cho kịch bản\`")
            }
            else if(args.join(" ").includes("deezer")){
              return message.reply("\`Danh sách phát không được hỗ trợ cho Playingkip\`")
            }
            else{
              return client.distube.playSkip(message, args.join(" "));
            }
  }
};
// Vinh đẹp trai bố đời thế
