const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "removedj",
  aliases: ["deletedj"],
  category: "📕 Setup Commands",
  description: "\`Hãy để bạn XÓA ROLE DJ\`",
  usage: "removedj @ROLE",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "DISABLE-DJ-ROLES-SETUP", `❌ \`Bạn\' không có quyền cho Lệnh này!\``)
    let role = message.mentions.roles.first();
    if (!role) return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `Please add a Channel via ping, for example: #channel!`)
    try {
        message.guild.roles.cache.get(role.id)
    } catch {
        return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`Có vẻ như Kênh không tồn tại trong server này!\``)
    }
 
    if(!client.settings.get(message.guild.id,`djroles`).includes(role.id))  return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`role này đã là một DJ-ROLE!\``)
    message.react("✅");
    client.settings.remove(message.guild.id, role.id, `djroles`);
    
    let leftb = "";
    if(client.settings.get(message.guild.id, `djroles`).join("") ==="") leftb = "\`không có vai trò Dj, hay còn gọi là Tất cả người dùng đều là Dj\`"
    else
    for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
      leftb += "<@&" +client.settings.get(message.guild.id, `djroles`)[i] + "> | "
    }
    return functions.embedbuilder(client,"null", message, config.colors.yes, "DJ-ROLES-SETUP", `✅ Đã xóa thành công ${role} khỏi Server-DJ-Roles này
    left DJ-ROLES:
    > ${leftb}
    `)
}
};