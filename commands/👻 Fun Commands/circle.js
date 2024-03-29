const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const Discord = require(`discord.js`);
const config = require("../../config.json")
const canvacord = require("canvacord");
const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "👻 Fun Commands",
    useage: `${path.parse(__filename).name} [@User]`,
  description: "*Hình ảnh theo phong cách:* " + path.parse(__filename).name ,
    run: async (client, message, args) => {
        let tempmsg = await message.channel.send(new MessageEmbed().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setAuthor("Đang tải...", "https://cdn.discordapp.com/emojis/769935094285860894.gif"))
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.circle(avatar);
        let attachment = await new Discord.MessageAttachment(image, "circle.png");
        let fastembed2 = new Discord.MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setImage("attachment://circle.png")
        .attachFiles(attachment).setFooter(client.user.username, config.AVATARURL)
        await message.channel.send(fastembed2);
        await tempmsg.delete();//changemymind
    }
}
