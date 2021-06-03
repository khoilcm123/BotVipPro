const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json")
const functions = require("../../functions")
module.exports = {
    name: "hhelp",
    aliases: ["hh"],
    cooldown: 3, 
    category: "🤖 Information Commands",
    description: "\`Trả về tất cả các lệnh hoặc một thông tin lệnh cụ thể\`",
    usage: "help [Command]",
    run: async (client, message, args) => {    
         //GET THE PREFIX
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;           
 if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
 
async function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .addField("**__Thông tin OWNER:__**", `
        >>> <@788208207465938954> \`VinhBot#3466\` [FACEBOOK](https://www.facebook.com/profile.php?id=100063748987527) | [MỜI BOT](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot)
        `)
        .setFooter(`Để xem mô tả lệnh và kiểu sử dụng: ${prefix}help [CMD Name]`, config.AVATARURL)
        .setTitle(`Help Menu\n\nPrefix: \`${prefix}\``)
        .setDescription("Cảm ơn bạn đã ủng hộ và sử dụng bot của mình")

        message.author.send(embed).then(msg=>
            { 
                message.channel.send(new MessageEmbed().setColor(config.colors.yes).setTitle(`🇻🇳 ${message.author.tag} \`Hãy kiểm tra tin nhắn của bạn\` `).setDescription("\`Để xem danh sách tất cả các lệnh\`"))
            }
        )
        
    const commands = (category) => { //finding all commands and listing them into a string with filter and map
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
    }
    try {
        for(let j = 0; j < client.categories.length; j += 5){
            const embed = new MessageEmbed() //defining the Embed
            .setColor(config.colors.yes)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("HELP MENU")
            .setFooter(`Để xem thông tin và mô tả lệnh, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
            for (let i = 0; i < 5; i += 1) {
                const current = client.categories[j+i]
                const info = commands(current);
                const items = info
                const n = 3
                const result = [[], [], []] 
                const wordsPerLine = Math.ceil(items.length / 3)
                for (let line = 0; line < n; line++) {
                for (let i = 0; i < wordsPerLine; i++) {
                    const value = items[i + line * wordsPerLine]
                    if (!value) continue
                    result[line].push(value)
                }
                }
                embed.addField(`**${current.toUpperCase()}**`,`> ${result[0].join("\n> ")}`,true)
                embed.addField(`\u200b`,`${result[1].join("\n") ? result[1].join("\n"): "\u200b"}`,true)
                embed.addField(`\u200b`,`${result[2].join("\n") ? result[2].join("\n"): "\u200b"}`,true)
            }
            message.author.send(embed)
        }
    } catch (error) {
        console.log(error)
    }
}
function getCMD(client, message, input) {
    const embed = new MessageEmbed() //creating a new Embed

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
    if(!cmd){ //if no cmd found return info no infos!
        return message.channel.send(embed.setColor("RED").setDescription(`\`Tôi không hề có lệnh:\` \`${input.toLowerCase()}\` \`như bạn vừa tìm vui lòng kiểm tra lại\``));
    }
    if(cmd.name) embed.addField("\`Tên lệnh\`", `\`${cmd.name}\``)
    if(cmd.name) embed.setTitle(`\`Thông tin chi tiết về:\` \`${cmd.name}\``)
    if(cmd.description) embed.addField("\`Thông tin lệnh\`", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("\`Lệnh phụ\`", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("\`Thời gian\`", `\`${cmd.cooldown} Giây\``)
        else embed.addField("\`Thời gian\`", `\`2 Giây\``)
    if(cmd.useage){
        embed.addField("\`Sử dụng\`", `\`${config.prefix}${cmd.useage}\``);
        embed.setFooter("Cú pháp: <> = bắt buộc, [] = không bắt buộc"); 
    }
    if(cmd.usage){
        embed.addField("\`Sử dụng\`", `\`${config.prefix}${cmd.usage}\``);
        embed.setFooter("Cú pháp: <> = bắt buộc, [] = không bắt buộc"); 
    }
    return message.channel.send(embed.setColor("RANDOM"));
}
}
}

// Đã full việt hoá :)) 
