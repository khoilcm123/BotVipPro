//Here the command starts
const config = require("../../config.json")
module.exports = {
	//definition
	name: "resetrankingall", 
	category: "📈 Ranking Commands", 
	aliases: [""], 
	cooldown: 4,
	usage: "resetrankingall", 
  	description: "\`Đặt lại thứ hạng của mọi người trong server này\`", 

	
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
