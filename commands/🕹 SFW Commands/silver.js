const { MessageEmbed, MessageAttachment } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
    name: 'silver',
    category: 'vui',
    description: '\`Ảnh Silver ( Thêm vào cho có )\`',
    aliases: ['bac', 'silver'],
    usage:"$silver",
    cooldown: 3,
    run: async (client, message, args) => {
        const folder = readdirSync("././assets/silver");
        const randomFile = folder[Math.floor(Math.random() * folder.length)];
        const file = readFileSync(`././assets/silver/${randomFile}`);
        const ext = randomFile.slice(-3);
        const attachment = new MessageAttachment(file, `silver.${ext}`);
        const embed = new MessageEmbed()
            .attachFiles(attachment)
            .setImage(`attachment://silver.${ext}`);
        message.channel.send(embed);
    },
};
