const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "reset",
  aliases: ["hardreset"],
  category: "📕 Setup Commands",
  description: "\`Đặt lại / Xóa tất cả các Thiết lập cũng như prefix\`",
  usage: "reset",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "BOT-CHAT-SETUP", `❌ \`Bạn\' không có quyền cho Lệnh này\``)

    if (message.member.guild.owner.id !== message.author.id) return functions.embedbuilder(client,"null", message, config.colors.no, "RESET", `❌ \`Bạn không có quyền cho Lệnh này | Chỉ chủ sở hữu của discord này mới có thể sử dụng|\``)
    let themsg = await message.reply("\`Bạn có thực sự muốn đặt lại tất cả CÀI ĐẶT không?\` || (*Trả lời bằng:* **__`yes`__**)||")
    const filter = m => m.author.id === message.author.id;
    themsg.channel.awaitMessages(filter, {
      max: 1,
      time: 600000,
      errors: ['time']
  })
  .then(async collected => { 
    if(collected === "yes")Y
    {
    try{
      await client.settings.delete(message.guild.id,"prefix");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"djroles");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"playingembed");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"playingchannel");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"botchannel");
    }catch{ /* */ } 
    try{
      await client.custom.delete(message.guild.id, "playlists");
    }catch{ /* */ }
    client.custom.ensure(message.guild.id, {
      playlists: [],
    });
    client.settings.ensure(message.guild.id, {
        prefix: config.prefix,
        djroles: [],
        playingembed: "",
        playingchannel: "",
        botchannel: [],
    });
    await message.reply("\`ĐẶT LẠI THÀNH CÔNG MỌI THỨ\`")
  }
  }).catch(error=> {
    message.reply("\`BỊ HỦY VÌ KHÔNG PHẢI LÀ CÔNG VIỆC ĐÚNG / THỜI GIAN RA NGOÀI\`")
  })
   
}
};
