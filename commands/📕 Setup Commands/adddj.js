const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "adddj",
  aliases: ["adddjrole"],
  category: "📕 Setup Commands",
  description: "\`Hãy để bạn xác định VAI TRÒ của DJ (dưới dạng một mảng, hay bạn có thể có nhiều)\`",
  usage: "adddj @role",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "DJ-ROLE", `\`Bạn\' không có quyền cho Lệnh này!\``)

    let role = message.mentions.roles.first();

    try {
        message.guild.roles.cache.get(role.id)
    } catch {
        return functions.embedbuilder(client, "null", message, config.colors.no, `LỖI`, `\`Có vẻ như role không tồn tại trong server này!\``)
    }

    if (!role) return functions.embedbuilder(client, "null", message, config.colors.no, `LỖI`, `\`Vui lòng thêm role qua ping, @role!\``)
    if(client.settings.get(message.guild.id,`djroles`).includes(role.id))  return functions.embedbuilder(client,"null", message, config.colors.no, `LỖI`, `\`role này là alerady trong Danh sách!\``)
  
    message.react("780401773532807208");

    client.settings.push(message.guild.id, role.id, `djroles`);
    let leftb = "";
    if(client.settings.get(message.guild.id, `djroles`).join("") === "") leftb = "\`không có vai trò Dj, hay còn gọi là Tất cả người dùng đều là Dj\`"
    else
    for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
      leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
    }
    
    return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-ROLE", `Đặt thành công ROLE DJ thành ${role}
    All Dj Roles:
    > ${leftb}`)
}
};