const { MessageEmbed } = require("discord.js");
const { promptMessage } = require('../../modules/utils');
const { getMember } = require('../../modules/utils');
module.exports = {
    name: "hiente",
    category: "",
    aliases:['bn', 'cấm', 'ra đảo', 'biến', 'cút', 'out'],
    description: "ban 1 thằng ất ơ, ngáo đá, toxic nào đấy khỏi server!",
    run: async(client,message, args) => {
        const logChannel = message.guild.channels.cache.get() || message.channel;

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) return message.reply("Phải tag tên người bạn muốn hiến tế chứ!").then(m => m.delete({ timeout: 5000 }));
        const reason = args.slice(1).join(' ') || "\`Không có\`";

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("Ôi bạn ơi, bạn làm gì có quyền hiến tế người ta")
                .then(m => m.delete({ timeout: 5000 }));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("Mình không có quyền hiến tế bạn ơi")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const toBan = await getMember(message, args.join(' '), false);

        // No member found
        if (!toBan) {
            return message.reply("Tìm không được bạn ơi!")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("Hiến tế chính mình sao dc ! Khác gì tự ** ** đâu")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("Bạn ấy role xịn hơn mình!")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .addField(' ---- Thực thi ----', [
                `**- Đã hiến tế bạn:** ${toBan} (${toBan.id})`,
                `**- Người hiến tế:** ${message.member} (${message.member.id})`,
                `**- Lý do:** ${reason}`,
            ]);

        const promptEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`\`Hãy trả lời trong 5p\``)
            .setDescription(`Bạn có muốn hiến tế ${toBan}?`);

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 300, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                try {
                    if (msg.deletable) msg.delete();
                    await toBan.send(`Alo ông vừa bị hiến ở server \`${toBan.guild.name}\` Ông xem lại thế nào đi chứ. Lý do ông bị hiến tế: \`${reason}\``);
                    toBan.ban({ reason: reason });
                    logChannel.send(embed);
                }
                catch(err) {
                    if (err.message.includes("Cannot send messages to this user")) {
                        toBan.ban({ reason: reason });
                        logChannel.send(embed);
                    }
                    else return message.channel.send(`\`Bị lỗi khi hiến tế: ${err.message}\``);
                };
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`\`Mọi thứ đã xong !\``)
                    .then(m => m.delete({ timeout: 10000 }));
            }
        });
    },
};
