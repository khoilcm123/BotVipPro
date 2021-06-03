const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "loop",
    cooldown: 5, 
    category: "🎶 Music Commmands",
    aliases: ["repeat"],
    useage: "loop <0/1/2> |",
  description: "\`Bật vòng lặp cho tắt / bài hát / hàng đợi \ n0 = tắt \ n1 = bài hát \ n2 = hàng đợi\`",
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
            if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `\`Bạn\' không có quyền để sử dụng lệnh này, bạn cần phải có quyền: ${leftb}\``)
        }
        
        if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "❌ \`Không có bài nào được phát\`")
            if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh Voice nào đó\`")
            if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh Voice của tôi\`: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
            if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "🤧 \`Vui lòng thêm một cái gì đó mà bạn muốn tìm kiếm\`")
            let loopis = args[0];
            if (args[0].toString().toLowerCase() === "song") loopis = "1";
            else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
            else if (args[0].toString().toLowerCase() === "off") loopis = "0";
            else if (args[0].toString().toLowerCase() === "s") loopis = "1";
            else if (args[0].toString().toLowerCase() === "q") loopis = "2";
            else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
            loopis = Number(loopis);

            if (0 <= loopis && loopis <= 2) {
                await client.distube.setRepeatMode(message, parseInt(args[0]));
                await functions.embedbuilder(client, 3000, message, config.colors.yes, "\`Chế độ lặp lại được đặt thành\`:", `${args[0].replace("0", "OFF").replace("1", "Lặp lại bài hát").replace("2", "Lặp lại hàng đợi")}`)
                return;
            }
            else {
                return functions.embedbuilder(client, 3000, message, config.colors.no, "ERROR", `\`Vui lòng sử dụng một số từ 0  đến 2  | (0: off, 1: Lặp lại một bài hát, 2: Lặp lại tất cả hàng đợi)\``)
            }
  }
  }; 
// Vinh đẹp trai bố đời thế 
