
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "removebotchat",
  aliases: ["removebotchat"],
  category: "📕 Setup Commands",
  description: "\`Hãy để bạn xóa kênh cho các lệnh bot\`",
  usage: "removebotchat",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "DISABLE-BOT-CHAT-SETUP", `❌ \`Bạn\' không có quyền cho Lệnh này!\``)
    let channel = message.mentions.channels.first();
    if (!channel) return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Vui lòng thêm Kênh qua ping, ví dụ: #channel\``)
    try {
        message.guild.roles.cache.get(channel.id)
    } catch {
        return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Có vẻ như Kênh không tồn tại trong Máy chủ này!\``)
    }
 
    if(!client.settings.get(message.guild.id,`botchannel`).includes(channel.id))  return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Kênh này không có trong Thiết lập kênh Bot\``)
    message.react("✅");
    client.settings.remove(message.guild.id, channel.id, `botchannel`);
    
    let leftb = "";
    if(client.settings.get(message.guild.id, `botchannel`).join("") ==="") leftb = "\`không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot\`"
    else
    for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
      leftb += "<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
    }
    return functions.embedbuilder(client,"null", message, config.colors.yes, "BOT-CHAT-SETUP", `✅ Đã xóa thành công ${channel} khỏi Máy chủ-Bot-Trò chuyện này
    left Bot chats:
    > ${leftb}
    `)
  }
};