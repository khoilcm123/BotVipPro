const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = {
	name: "mute", 
	category: "⛔️ Moderation Commands", 
	aliases: [""],
	cooldown: 4, 
	usage: "mute @User <Time+Format(e.g: 10m)> [REASON]", 
	description: "\`Tắt tiếng ( mute ) thành viên trong một thời gian cụ thể\`",
	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));
			
		let member = message.mentions.members.first();
		if (!member) return message.reply("❌ \`vui lòng ping THÀNH VIÊN trong server! Cách sử dụng: < prefix >mute @User <Time + Format (ví dụ: 10m)> [ lý do ] thí dụ: < prefix >mute @User 10m nó gây war trong server!\`")
		args.shift();

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x: \`Tôi không thể tắt tiếng Thành viên này, vì anh ta cao hơn / Bằng vị trí role của bạn\`")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("❌ \`Tôi cần quyền để Quản lý role hay còn gọi là cung cấp role\`");

		let time = args[0];
		if (!time) return message.reply("❌ \`vui lòng thêm THỜI GIAN! Cách sử dụng: < prefix >mute @User <Thời gian + định dạng (ví dụ: 10m)> [LÝ DO] thí dụ: < prefix >mute @User 10m nó gây war trong server\`")
		args.shift();

		let reason = args.join(" ");

		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("khoá mõm")) {          //nếu lỗi thì hãy thay bằng muted thông thường
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply("\`Tôi cần quyền để Quản lý role hay còn gọi là cung cấp role\`");
			let highestrolepos = message.guild.me.roles.highest.position;
			console.log(Number(highestrolepos)-1)
			mutedrole = await message.guild.roles.create({
					data: {
						name: 'khoá mõm',
						color: '#222222',
						hoist: false, 
						position: Number(highestrolepos) - 1,
					  
					},
					reason: 'role này đã được tạo, để tắt tiếng Thành viên!',
				})
				.catch(e => {
					console.log(e);
					message.reply("TÔI KHÔNG THỂ TẠO ROLE, xin lỗi")
				});
		}
		if(mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x: \`Tôi không thể truy cập role vì nó ở trên tôi\`")
		}
		let mutetime;
		try{
		mutetime = ms(time);
		}catch{
			return message.reply("❌ \`vui lòng thêm THỜI GIAN! Cách sử dụng: < prefix >mute @User <Thời gian + định dạng (ví dụ: 10m)> [LÝ DO] thí dụ: < prefix >mute @User 10m nó gây war trong server\`")
		}	
		if(!mutetime || mutetime === undefined) return message.reply("❌ \`vui lòng thêm THỜI GIAN! Cách sử dụng: < prefix >mute @User <Thời gian + định dạng (ví dụ: 10m)> [LÝ DO] thí dụ: < prefix >mute @User 10m nó gây war trong server\`")
		
		await message.guild.channels.cache.forEach(ch => {
			try{
				ch.updateOverwrite(mutedrole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
			}catch (e) {console.log(e)}
		})

		try{
			member.roles.add(mutedrole);
		}catch{
			message.channel.send("Something went wrong!")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`Khoá mõm: \`${member.user.tag}\``)
		.setThumbnail(member.user.displayAvatarURL({dynamic:true}))
		.setFooter(`Yêu cầu bởi: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		.setDescription(`Thanh niên bị khoá mõm trong: \`${ms(mutetime, { long: true })}\`${reason ? `\n\n**Lý Do**\n> ${reason.substr(0 , 1800)}`: "\nNO REASON"}`)
		message.channel.send(embed).catch(e=>console.log(e))
		
		member.send(embed.setTitle(`Bị khoá mõm bởi: \`${message.author.tag}\``)).catch(e=>console.log(e))
		
		setTimeout(()=>{
			try{
				message.channel.send(embed.setTitle(`Bạn đã được bỏ khoá mõm: \`${member.user.tag}\``).setDescription("\u200b")).catch(e=>console.log(e))
				member.roles.remove(mutedrole);
			}catch{
				message.channel.send("\`Đã xảy ra sự cố!\`")
			}
		}, mutetime)
	}
}
