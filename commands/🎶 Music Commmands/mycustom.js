const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "mycustom",
    category: "🎶 Music Commmands",
    aliases: [""],
    useage: "mycustom <add/remove/play/reset> [LINK]",
  description: "\`Thêm / Xóa / Phát một danh sách phát được tạo tùy chỉnh!\`",
 
  run: async (client, message, args) => {


    let playlist = client.custom2.get(message.author.id, "myplaylists");
    if(args[0] === "add" || args[0] === "set" || args[0] === "use")
    {
      if(!args[1].includes("http")) return message.reply("❌ \`Đó không phải là một Liên kết chẳng hạn: https://www.youtube.com/watch?v=abcxyz")
      if(playlist.includes(args[1])) return message.reply("❌ \`Bài hát đã có trong Playlist Server, BÀI HÁT KHÔNG LẶP LẠI!\`")
      client.custom2.push(message.author.id, args[1], "myplaylists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "✔️ \`ĐÃ THÊM THÀNH CÔNG MỘT BÀI HÁT VÀO DANH SÁCH PHÁT\`" + `
      \`Hiện có: ${playlist.length+1} bài hát trong playlist\``)
    }
    if(args[0] === "reset" || args[0] === "res")
    {
      let themsg = await message.reply("\`Bạn có thực sự muốn đặt lại danh sách phát tùy chỉnh của mình không? ||(*Reply with:__`yes`__)||\`")
      const filter = m => m.author.id === message.author.id;
      themsg.channel.awaitMessages(filter, {
        max: 1,
        time: 600000,
        errors: ['time']
    })
    .then(async collected => { 
      if(collected === "yes")
      {
      try{
        await client.custom2.delete(message.author.id, "myplaylists");
      }catch{ /* */ }
      client.custom2.ensure(message.author.id, {
        myplaylists: [],
      });
      await message.reply("✔️ \`ĐÃ ĐẶT LẠI THÀNH CÔNG DANH SÁCH PHÁT TÙY CHỈNH CỦA BẠN\`")
    }
    }).catch(error=> {
      message.reply("❌ \`BỊ HỦY NGUYÊN NHÂN KHÔNG PHẢI LÀ CÔNG VIỆC ĐÚNG / THỜI GIAN RAN RA NGOÀI!\`")
    })
    }
    if(args[0] === "play" || args[0] === "p"  || args[0] === "hear"|| args[0] === "listen")
    {
      client.distube.playCustomPlaylist(message, playlist, { name: message.author.username + "'s Playlist" });
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "PHÁT DANH SÁCH TÙY CHỈNH")
    }
    if(args[0] === "remove"  || args[0] === "delete"  || args[0] === "del"  || args[0] === "rem")
    {
      if(!args[1]) return message.reply("Please add a song link what you want to add, thanks!");
      if(!playlist.includes(args[1])) return message.reply("❌ \`Bài hát không tồn tại, trong danh sách bài hát, hãy đảm bảo nó là cùng một liên kết!\`")
     
      client.custom2.remove(message.author.id, args[1], "myplaylists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "✔️ \`ĐÃ XÓA THÀNH CÔNG BÀI HÁT TỪ DANH SÁCH PHÁT CỦA BẠN\`")
    }
    else{
      let string = playlist.join("\n");
      customplay(message, string, playlist)
      functions.embedbuilder(client, "null", message, config.colors.yes, `\`Có ${playlist.length} Bài hát trong Danh sách phát của bạn\``, )
      return functions.embedbuilder(client, "null", message, config.colors.yes, `\`Cú pháp lệnh\`:`, "+mycustom <add/remove/play> [Link]")
    }
  }
};
async function customplay(message, string, cursong){
  let currentPage = 0;
  const embeds = functions.customplaylistembed(client, message, string, cursong);

  const queueEmbed = await message.channel.send(
      `\`Trang hiện tại - ${currentPage + 1}/${embeds.length}\``,
      embeds[currentPage]
  );

  try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");
  } catch (error) {
      console.error(error);
      functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\`Lỗi đã được gửi đến chủ sở hữu của tôi!\`")
      functions.errorbuilder(error.stack.toString().substr(0, 1000))
  }

  const filter = (reaction, user) =>
      ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

  collector.on("collect", async (reaction, user) => {
      try {
          if (reaction.emoji.name === "⬅️") {
              if (currentPage < embeds.length - 1) {
                  currentPage++;
                  queueEmbed.edit(`\`Trang hiện tại - ${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
              }
          } else if (reaction.emoji.name === "➡️") {
              if (currentPage !== 0) {
                  --currentPage;
                  queueEmbed.edit(`\`Trang hiện tại - ${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
              }
          } else {
              collector.stop();
              reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
      } catch (error) {
          console.error(error);
          functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\` Lỗi đã được gửi tới chủ sử hữu của tôi\`")
          functions.errorbuilder(error.stack.toString().substr(0, 2000))
      }
  });

}
// Vinh đẹp trai bố đời thế 
