const config = require("../../config.json")
module.exports = {
	
	name: "levelinghelp",  
	category: "📈 Ranking Commands", 
	aliases: [""], 
	cooldown: 4, 
	usage: "levelinghelp",
  	description: "\`Hiển thị sự trợ giúp cho việc leveling\`", 

  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
	const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu của bạn đã vô hiệu hóa Hệ thống ranking! Lấy làm tiếc")
    .setFooter("Bot made in Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
	if(!ranking.enabled) return message.reply(disabled);
	}
}
