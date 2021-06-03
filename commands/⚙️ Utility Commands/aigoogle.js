const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "aigoogle",
    category: "⚙️ Utility Commands",
    description: "\`Dành cho thằng nào lười sử dụng google\`",
    usage: ".google <câu hỏi>",
    run: async (client, message, args) => {
        if (message.deletable) await message.delete();
        if (!args[0]) return message.reply('Nhập gì đó đi bạn');
        const question = encodeURIComponent(args.join(' '));
        const link = `http://letmegooglethat.com/?q=${question}`;
        const embed = new MessageEmbed()
            .setTitle('Câu trả lời của bạn đây')
            .setURL(link)
            .setFooter('Click vào link ở trên');
        message.channel.send(embed);
    },
};
