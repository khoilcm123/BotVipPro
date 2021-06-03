const config = require("../../config.json")
module.exports = {
	name: "rank", 
	category: "📈 Ranking Commands", 
	aliases: [""],
	cooldown: 4,
	usage: "rank [@User]", 
  	description: "\`Hiển thị Xếp hạng của Thành viên\`", 

	
  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
	
		const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu server của bạn đã vô hiệu hóa Hệ thống rank! Lấy làm tiếc")
    .setFooter("Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
	if(!ranking.enabled) return message.reply(disabled);
	}
}
