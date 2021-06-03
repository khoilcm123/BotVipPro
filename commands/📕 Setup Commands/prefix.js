
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "prefix",
  aliases: ["prefix"],
  category: "📕 Setup Commands",
  description: "\`Thay đổi prefix của bot trong server discprd của các bạn\`",
  usage: "prefix <NEW PREFIX>",
  run: async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "BOT-CHAT-SETUP", `❌ \`Bạn\' không có quyền để sử dụng lệnh này\``)

  let prefix = client.settings.get(message.guild.id, `prefix`);
  if (prefix === null) prefix = config.prefix;
  message.react("✅");
  if (!args[0]) return functions.embedbuilder(client,"null", message, "YELLOW", `\`prefix hiện tại: ${prefix} :Vui lòng cung cấp một prefix mới`)
  if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "prefix", `❌ \`Bạn\' không có quyền cho Lệnh này\``)

  if (args[1]) return functions.embedbuilder(client,"null", message, config.colors.no, "prefix", `❌ The prefix can\'t have two spaces`)
  if (args[0].length > 5) return functions.embedbuilder(client,"null", message, config.colors.no, "ERROR", `❌ \`Prefix không thể dài hơn 5 chữ số\``)

  client.settings.set(message.guild.id, args[0], `prefix`);

  return functions.embedbuilder(client,"null", message, config.colors.yes, "prefix", `✅ \`Đặt thành công Prefix mới của các bạn là:\` **\`${args[0]}\`**`)
  }
};
