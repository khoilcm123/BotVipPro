
const config = require("../../config.json")
module.exports = {
	name: "addpoints", 
	category: "📈 Ranking Commands",
	aliases: [""],
	cooldown: 4, 
	usage: "addpoints <@User> <Amount>", 
  	description: "\`Thêm một lượng Điểm cụ thể cho thành viên\`",


  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
    const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu của bạn đã vô hiệu hóa Hệ thống rank! Lấy làm tiếc")
    .setFooter("Bot made in nguyễn vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
	if(!ranking.enabled) return message.reply(disabled);
	}
}