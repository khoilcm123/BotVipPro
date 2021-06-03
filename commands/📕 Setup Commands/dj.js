const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "dj",
	aliases: ["dj"],
    category: " Setup Commands",
    description: "What is the DJ ROLE",
    usage: "dj",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, "#ff264a", "DISABLE-DJ-ROLE", `\`Bạn\' không có quyền cho Lệnh này\``)

        client.settings.delete(message.guild.id, `djrole`);

        return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-ROLE", `\`Đã xóa thành công DJ ROLE khỏi server này\``)
      }
}
