const { MessageEmbed, MessageAttachment } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
    name: 'girl',
    category: 'vui',
    description: '\`Show ảnh gái xD ( nếu có ảnh gái xinh thì hãy liên hệ với vinh để add vào nhé )\`',
    aliases: ['xinh', 'gái', 'gai'],
    usage:"!gái",
    cooldown: 3,
    run: async (client, message, args) => {
        const folder = readdirSync("././assets/gaixinhchonloc");
        const randomFile = folder[Math.floor(Math.random() * folder.length)];
        const file = readFileSync(`././assets/gaixinhchonloc/${randomFile}`);
        const ext = randomFile.slice(-3);
        const attachment = new MessageAttachment(file, `gaixinh.${ext}`);
        const embed = new MessageEmbed()
            .attachFiles(attachment)
            .setImage(`attachment://gaixinh.${ext}`);
        message.channel.send(embed);
    },
};
