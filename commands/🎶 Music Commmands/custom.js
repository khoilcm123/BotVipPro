const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "custom",
    category: "🎶 Music Commmands",
    aliases: [""],
    useage: "custom <add/remove/play/reset> [LINK]",
  description: "\`Thêm/ Xóa/ Phát danh sách phát được tạo tùy chỉnh\`",
 
  run: async (client, message, args) => {


    let playlist = client.custom.get(message.guild.id, "playlists");
    if(args[0] === "add" || args[0] === "set" || args[0] === "use")
    {
      if(!args[1].includes("http")) return message.reply("❌ \`Đó không phải là một Liên kết chẳng hạn: https://www.youtube.com/watch?v=abcxyz\`")
      if(playlist.includes(args[1])) return message.reply("❌ \`Bài hát đã có trong Playlist Server, BÀI HÁT KHÔNG GẤP ĐÔI\`")
      client.custom.push(message.guild.id, args[1], "playlists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "✔️ \`ĐÃ THÊM THÀNH CÔNG MỘT BÀI HÁT VÀO DANH SÁCH PHÁT\`" + `
      \`Hiện có: ${playlist.length} bài hát trong danh sách phát Máy chủ\``)
    }
    if(args[0] === "reset" || args[0] === "res")
    {
      let themsg = await message.reply("Bạn có thực sự muốn đặt lại danh sách phát của mình không? ||(*Reply with:* **__`yes`__**)||")
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
        await client.custom.delete(message.guild.id, "playlists");
      }catch{ /* */ }
      client.custom.ensure(message.guild.id, {
        playlists: [],
      });
      await message.reply("✔️ \`ĐÃ ĐẶT LẠI THÀNH CÔNG DANH SÁCH PHÁT\`")
    }
    }).catch(error=> {
      message.reply("❌ \`BỊ HỦY VÌ KHÔNG PHẢI LÀ CÔNG VIỆC ĐÚNG/THỜI GIAN RA NGOÀI\`")
    })
    }
    if(args[0] === "play" || args[0] === "p"  || args[0] === "hear"|| args[0] === "listen")
    {
      client.distube.playCustomPlaylist(message, playlist, { name: message.author.username + "'s Playlist" });
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "PHÁT DANH SÁCH TÙY CHỈNH")
    }
    if(args[0] === "remove"  || args[0] === "delete"  || args[0] === "del"  || args[0] === "rem")
    {
      if(!args[1]) return message.reply("❌ \`Vui lòng thêm một liên kết bài hát những gì bạn muốn thêm, cảm ơn\`");
      if(!playlist.includes(args[1])) return message.reply("❌ \`Bài hát không tồn tại, trong danh sách phát, hãy đảm bảo rằng nó là cùng một liên kết có thể sử dụng\`")
     
      client.custom.remove(message.guild.id, args[1], "playlists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "✔️ \`ĐÃ XÓA THÀNH CÔNG BÀI HÁT TỪ DANH SÁCH PHÁT\`")
    }
    else{
      let string = playlist.join("\n");
      customplay(message, string, playlist[0])
      functions.embedbuilder(client, "null", message, config.colors.yes, `🤧\`Có ${playlist.length} Bài hát trong Danh sách phát!\``, )
      return functions.embedbuilder(client, "null", message, config.colors.yes, `Cú pháp lệnh:`, "+custom <add/remove/play> [Link]")
    }
  }
};
async function customplay(message, string, cursong){
  let currentPage = 0;
  const embeds = functions.customplaylistembed(client, message, string, cursong);

  const queueEmbed = await message.channel.send(
      `\`Trang hiện tại- ${currentPage + 1}/${embeds.length}\``,
      embeds[currentPage]
  );

  try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");
  } catch (error) {
      console.error(error);
      functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\`Đã gửi lỗi cho chủ sở hữu của tôi\`")
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
          functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\`Lỗi đã được gửi cho chủ sở hữu của tôi!\`")
          functions.errorbuilder(error.stack.toString().substr(0, 2000))
      }
  });

}
// Vinh đẹp trai bố đời thế 
