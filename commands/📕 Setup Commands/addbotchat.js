
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "addbotchat",
  aliases: ["addbotchannel"],
  category: "📕 Setup Commands",
  description: "\`Hãy cho phép bạn kích hoạt một cuộc trò chuyện chỉ dành cho bot trong đó cộng đồng được phép sử dụng các lệnh\`",
  usage: "addbotchat <#chat>",
  run: async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "BOT-CHAT-SETUP", `❌ Bạn\' không có quyền cho Lệnh này!`)

  let channel = message.mentions.channels.first();
  if (!channel) return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Vui lòng thêm Kênh qua ping, ví dụ: #channel!\``)
  try {
      message.guild.roles.cache.get(channel.id)
  } catch {
      return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Có vẻ như Kênh không tồn tại trong server này!\``)
  }
  if(client.settings.get(message.guild.id,`botchannel`).includes(channel.id))  return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Kênh này là alerady trong Danh sách!\``)
   
  message.react("✅").catch(e=>console.log(e.stack.toString().red));

  client.settings.push(message.guild.id, channel.id, `botchannel`);
  let leftb = "";
  if(client.settings.get(message.guild.id, `botchannel`).join("") ==="") leftb = "\`không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot\`"
  else
  for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
    leftb += "<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
  }
  let botchatfromenmap = message.guild.channels.cache.get(client.settings.get(message.guild.id, `botchannel`)[client.settings.get(message.guild.id, `botchannel`).length])

  return functions.embedbuilder(client,"null", message, config.colors.yes, "BOT-CHAT-SETUP ", `✅ \`Đã thêm thành công Bot-Chat vào\` ${botchatfromenmap}
  Tất cả các cuộc trò chuyện của Bot:
  > ${leftb}`)

  }
};