//Here the command starts
const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = {
	name: "unmute", 
	category: "⛔️ Moderation Commands",
	aliases: [""], 
	cooldown: 4, 
	usage: "unmute @User", 
	description: "\`Bỏ khoá mõm thành viên\`",

	
	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));


		let member = message.mentions.members.first();
		if (!member) return message.reply("\`Vui lòng gắn thẻ ( tag ) thành viên cần gỡ khoá mõm\`")
		args.shift(); 

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x: \`Tôi không thể bỏ khoá mõm Thành viên này, vì anh ta cao hơn/Bằng vị trí role của bạn\`")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("❌ \`Tôi cần quyền để Quản lý role\`");


		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("khoá mõm")) { // nếu lỗi thì đổi thành muted
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			return message.reply(":x: \`Bạn chưa bao giờ khoá mõm ai đó, chưa có role nào bị khoá mõm!\`")
		}
		if(!message.member.hasPermission("ADMINISTRATOR") && mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x: \`Tôi không thể truy cập role, vì nó ở trên tôi!\`")
		}
		try{
			member.roles.remove(mutedrole);
		}catch{
			message.channel.send("Đã xảy ra sự cố")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`bỏ khoá mõm: \`${member.user.tag}\``)
		.setThumbnail(member.tag.displayAvatarURL({dynamic:true}))
		.setFooter(`Yêu cầu bởi: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		message.channel.send(embed)
		try{
			member.send(embed.setTitle(`\`Bạn đã được bỏ khoá mõm bởi: ${message.author.tag}\``))
		}catch{
		}		
	}
}
