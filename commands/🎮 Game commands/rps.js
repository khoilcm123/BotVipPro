const discord = require('discord.js')
module.exports = {
	name: "rps",
        category:"🎮 Game commands",
	description: "\`Chơi oẳn tù tì cùng với em\`",
	run: async(client, message, args) => {
		let embed = new discord.MessageEmbed()
		.setTitle("RPS GAME")
		.setDescription("Phản ứng để chơi!")
		.setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react("👊")
		await msg.react("✂")
		await msg.react("☘️")

		const filter = (reaction, user) => {
            return ['👊', '✂️', '☘️'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['👊', '✂', '☘️']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new discord.MessageEmbed()
        		.setTitle(" ------ ")
        		.addField("lựa chọn của bạn", `${reaction.emoji.name}`)
        		.addField("Lựa chọn của tôi", `${me}`)
			await msg.edit(result)
        		if ((me === "👊" && reaction.emoji.name === "✂") ||
                (me === "☘️" && reaction.emoji.name === "👊") ||
                (me === "✂" && reaction.emoji.name === "☘️")) {
                    message.reply("Bạn đã thua!");
            } else if (me === reaction.emoji.name) {
                return message.reply("Hoà nhé bạn");
            } else {
                return message.reply("Bạn đã thắng!");
            }
        })
        .catch(collected => {
                message.reply('Trả lời chậm thì thua nha');
            })
}
}
