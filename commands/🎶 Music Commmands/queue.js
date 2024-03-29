const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "queue",
    category: "🎶 Music Commmands",
    aliases: ["qu"],
    useage: "queue",
  description: "\`Hiển thị hàng đợi hiện tại\`",
  run: async (client, message, args) => {
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "\`Không có bài nào được phát\`")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Bạn phải tham gia Kênh voice\`")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          

     let currentPage = 0;
     let queue = client.distube.getQueue(message);
     if (!queue) return functions.embedbuilder(client, "null", message, config.colors.no, "🎶 \`Khoong có bài nào được phát\`");
     console.log(queue.songs.length)
     const embeds = functions.QueueEmbed(client, queue.songs);
     const queueEmbed = await message.channel.send(`
     \`Trang hiện tại - ${currentPage + 1}/${embeds.length}  |  ${queue.songs.length} Songs\``,
         embeds[currentPage]);
     try {//dfd40d
         await queueEmbed.react("805375191555375124");
         await queueEmbed.react("805375191638081588");
         await queueEmbed.react("805375191651319828");
     } catch (error) {
         console.error(error)
         functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\`Lỗi đã được gửi cho chủ sở hữu của tôi!\`")
         functions.errorbuilder(error.stack.toString().substr(0, 2000))
     }
     const filter = (reaction, user) =>
         ["805375191555375124", "805375191638081588", "805375191651319828"].includes(reaction.emoji.id) && message.author.id === user.id;
     const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
     collector.on("collect", async (reaction, user) => {
         try {
             reaction.users.remove(message.author.id);
             if (reaction.emoji.id === "805375191651319828") {
                 if (currentPage < embeds.length - 1) {
                     currentPage++;
                     queueEmbed.edit(`\`Trang hiện tại - ${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
                 }
             } else if (reaction.emoji.id === "805375191555375124") {
                 if (currentPage !== 0) {
                     --currentPage;
                     queueEmbed.edit(`\`Trang hiện tại  - ${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
                 }
             } else {
                 collector.stop();
                 reaction.message.reactions.removeAll();
             }
            
         } catch (error) {
             console.error(error)
             functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n\`Lỗi đã được gửi đi\`")
             functions.errorbuilder(error.stack.toString().substr(0, 2000))
 
         }
     })
  }
  };
