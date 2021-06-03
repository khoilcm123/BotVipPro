const config = require("../../config.json")
module.exports = {
	name: "removelevel",  
	category: "📈 Ranking Commands",
	aliases: [""], 
	cooldown: 4, 
	usage: "removelevel <@User> <Amount>",
  	description: "\`Xóa một lượng Cấp cụ thể cho Thành viên\`",

  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
	const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu server của bạn đã vô hiệu hóa Hệ thống Rank! Lấy làm tiếc")
    .setFooter("Bot made in Nguyễn vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
	if(!ranking.enabled) return message.reply(disabled);
	}
}
