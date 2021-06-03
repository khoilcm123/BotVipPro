const config = require("../config.json")
console.log("LOADING SLASH COMMANDS...".brightCyan)
const Discord = require("discord.js");
module.exports = (client) => {
///////////////////////////////
/////////SLASH COMMANDS////////
///////////////////////////////
client.on('ready', () => {
   
//client.api.applications(client.user.id).guilds('guild id').commands.post({data: {     für einen server VVVV ist für mehr als 1 server
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "help",
            description: "Hiển thị cho bạn thông tin cho mỗi cmd"
        }
    });
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "info",
            description: "Xem một số thông tin về Musicium"
        }
    });
    client.api.applications(client.user.id).commands.post({

        data: {
            name: "invite",
            description: "Mời Bot đến máy chủ của riêng bạn và có được trải nghiệm âm nhạc đỉnh cao"
        }
    });
    client.ws.on('INTERACTION_CREATE', async interaction => {
        let prefix = await client.settings.get(interaction.guild_id, `prefix`);
        if (prefix === null) prefix = config.prefix;

        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
	let inviteembed = new Discord.MessageEmbed()
	.setColor(config.colors.yes)
	.setTitle("Invite me now!")
	.setDescription(`[Mời Bot vào server](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot%20applications.commands)
        
        [DISCORD SERVER](https://discord.gg/HGd5uJ7eV8)
           |   [FACEBOOK](https://www.facebook.com/profile.php?id=100063748987527)   |   🇻🇳 Cảm ơn vì đã mời!`)
	.setFooter(client.user.username + " | Syntax:  <>...must    []...optional", client.user.displayAvatarURL())
	.setAuthor(interaction.member.user.username,  client.user.displayAvatarURL(), "hế hế")
	let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;

            const infoembed = new Discord.MessageEmbed()
                .setAuthor(
                    `Thông tin về: ${client.user.username} Bot`,
                    client.user.displayAvatarURL(), "https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot%20applications.commands"
                )
                .setColor(config.colors.yes)
                .addFields(
                    {
                        name: 'NOT TAG',
                        value: `\`${client.user.tag}\``,
                        inline: true,
                    },
                    {
                        name: 'Version',
                        value: `\`7.0.0\``,
                        inline: true,
                    },
                    {
                        name: "prefix lệnh",
                        value: `\`${prefix}\``,
                        inline: true,
                    },
          
                    {
                        name: 'Thời gian kể từ lần khởi động lại gần đây nhất',
                        value: `\`${process.uptime().toFixed(2)}s\``,
                        inline: true,
                    },
                    {
                        name: 'Uptime',
                        value: `\`${days}Ngày\` \`${hours}Giờ\` \`${minutes}Phút\` \`${seconds}Giây\``,
                        inline: true,
                    },
                    {
                        name: 'Số lượng server',
                        value: `\`${client.guilds.cache.size}\``,
                        inline: true,
                    },
                    {
                        name: 'Tổng số thành viên',
                        value: `**\`${totalMembers}\`**`,
                        inline: true,
                    },
                    {
                        name: 'Chủ sở hữu và Nhà phát triển',
                        value: `\`VinhBot#3466\` <@788208207465938954>`,
                        inline: true,
                    },
                )
                .addField("\u200b", `
            \u200b
            `)
                .addField("***Thông tin OWNER:***", `
            >>> <@788208207465938954> \`VinhBot#3466\` [FACEBOOK](https://www.facebook.com/profile.php?id=100063748987527)
            `)
                .addField("***ỦNG HỘ:***", `
            >>> [DISCORD](https://discord.gg/HGd5uJ7eV8) | [MỜI BOT](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot%20applications.commands/)
            `)
            const helpembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle(`Help Menu\nPrefix: \`${prefix}\``)
                .addField("\u200b","\u200b")
                .addField("**THÔNG TIN BỘ LỌC BASSBOOST**", `
                >>> Bây giờ bạn có thể thay đổi mức tăng Bassboost của bạn từ \`1\`-\`20\`! Thí dụ: \`${prefix}bassboost 10\` *Tạo ra một Bassboost với 10db Tăng*
                `)
                .addField("**DANH SÁCH PHÁT TÙY CHỈNH TRƯỚC**", `
                >>> có một số danh sách phát tùy chỉnh mà bạn có thể phát, mỗi danh sách có 75 bài hát!
                
                1. Charts
                2. Christmas
                3. Jazz
                4. Blues
                5. Country
                6. Rock
                *nhiều hơn sắp ra mắt*
                \`Sử dụng lệnh: ${prefix}playlist <Playlist Number.>\`
                `)
                .addField("**RADIO STATIONS**", `
                >>> có hơn 200 đài phát thanh có sẵn, bạn có thể xem chúng bằng cách nhập: \`${prefix}radio\`
                and play them by \`${prefix}radio <stationnum.>\`
                `)
                .addField("\u200b","\u200b")
                .addField("**__Thông tin OWMER:__**", `
                >>> <@788208207465938954> \`Vinhbot#3466\` [FACEBOOK](https://www.facebook.com/profile.php?id=100063748987527) | [MỜI BOT](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot%20applications.commands)
                `)
             
            .setFooter(`Để xem mô tả lệnh và kiểu sử dụng ${prefix}help [CMD Name]`, client.user.displayAvatarURL())
            
        const commands = (category) => {
            return client.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
                .join(", ");
        }
    
        const info = client.categories
            .map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
            .reduce((string, category) => string + "\n\n" + category);
            helpembed.setDescription(info.substr(0, 1900)+ `... để xem tất cả lệnh, hãy nhập: \`${prefix}help\``);
        if(command == 'help') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, helpembed)
                }
            });
        }
		 if(command == 'invite') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, inviteembed)
                }
            });
        }
		if(command == 'info') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, infoembed)
                }
            });
        }
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}
 console.log('Lệnh Slash đã tải'.brightGreen);
}