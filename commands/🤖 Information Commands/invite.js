const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "invite",
	aliases: ["add"],
    category: "🤖 Information Commands",
    description: "\`Dùng để khi bạn muốn mời bot vào server của mình\`",
    usage: "invite",
    run: async (client, message, args) => {
        let inviteembed = new Discord.MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setTitle("Invite BOTS")
        .setDescription(`Hãy [bấn vào đây](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot) nếu muốn mời tao vào server
        
        (VINH ĐẸP TRAI BỐ ĐỜI THẾ)`)
        .setFooter(client.user.username, config.AVATARURL)
        
        message.reply(inviteembed);
    }
}
