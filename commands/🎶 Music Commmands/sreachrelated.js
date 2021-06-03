const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "searchrelated",
    category: "🎶 Music Commmands",
    cooldown: 5, 
    aliases: ["searchrelated", "searchsimilar", ],
    useage: "searchrelated --> 'chờ đợi' --> Nhập một số",
  description: "\`Tìm kiếm các bài hát tương tự của Bản nhạc hiện tại và cho phép bạn chọn bài hát bạn muốn\`",
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
              if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn không có quyền để sử dụng lệnh này, bạn cần phải có quyền: ${leftb}\``)
          }
          //CHECK IF DJ LOL
  if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \` Bạn cần phải tham gia kênh voice nào đó\`")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn cần tham gia kênh voice của tôi:\`" + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)  
    let newsong = await client.distube.addRelatedVideo(message);

          let result = newsong.songs;

          let searchresult = "";
    
          for (let i = 0; i < result.length; i++) {
              try {
                  searchresult += await `**${i+1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
              } catch {
                  searchresult += await " ";
              }
          }
          await functions.embedbuilder(client, "null", message, config.colors.yes, "🔍 \`Kết quả tìm kiếm cho các bài hát có liên quan\`", searchresult)
          let userinput;
          await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
              userinput = collected.first().content;
              if (Number(userinput) <= 0 && Number(userinput) > 10) {
                  functions.embedbuilder(client, "null", message, config.colors.no, "\`Không phải là một con số đúng!\`", "\`vì vậy tôi sử dụng số 1!\`")
                  userinput = 1;
              }
          }).catch(() => { console.error; userinput = 404 });
          if (userinput === 404) {
              return functions.embedbuilder(client, "null", message, config.colors.no, "\`Đã xảy ra lỗi!\`")
          }
          functions.embedbuilder(client, 10000, message, config.colors.yes, "Thêm:", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
          return client.distube.play(message, result[userinput - 1].url)
    return;
  }
};
