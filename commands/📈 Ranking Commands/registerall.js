const config = require("../../config.json")
module.exports = {
	
	name: "registerall",
	category: "📈 Ranking Commands", 
	aliases: [""], 
	cooldown: 4, 
	usage: "registerall", 
  	description: "\`Đăng ký mọi người trong server vào Cơ sở dữ liệu\`", 

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
