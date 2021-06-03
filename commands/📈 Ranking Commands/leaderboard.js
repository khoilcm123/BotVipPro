const config = require("../../config.json")
module.exports = {
	
	name: "leaderboard", 
	category: "📈 Ranking Commands", 
	aliases: ["lb", "top"], 
	cooldown: 4,
	usage: "leaderboard",
  	description: "\`Hiển thị 10 bảng xếp hạng hàng đầu\`", 

	
  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
	const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu của bạn đã vô hiệu hóa Hệ thống ranking! Lấy làm tiếc")
    .setFooter("Bot made in Nguyễn vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
	if(!ranking.enabled) return message.reply(disabled);
	}
}