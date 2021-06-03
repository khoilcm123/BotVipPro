const Discord = require("discord.js")
const config = require("../../config.json")
const { version } = require("discord.js");
module.exports = {
    name: "info",
    category: "⚙️ Utility Commands",
  description: "\`Gửi thông tin chi tiết về người dùng\`",
  usage: "info",
  run: async (client, message, args) => {
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;           //nếu không có prefix, hãy đặt nó thành prefix chuẩn trong tệp config.json
    let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
   
    let boch = "";
    if(client.settings.get(message.guild.id, `botchannel`).join("") ==="") boch = "not setup"
    else
    for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length;i++){
        boch += "<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
    }
    let djs = "";
    if(client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
    else
    for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
        djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(
            `\`Thông tin về Bot ${client.user.username}\``,
            config.AVATARURL, "https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot"
        )
        .setColor(config.colors.yes)
        .addFields(
            {   name: '🤖 BOT TAG',
                value: `**\`${client.user.tag}\`**`,
                inline: true,
            },
            {   name: '🤖 BOT VERSION',
                value: `**\`7.0.0\`**`,
                inline: true,
            },
            {   name: '🤖 DISCORD.JS VERSION',
                value: `**\`${version}\`**`,
                inline: true,
            },
            {   name: '⌚️ UPTIME',
            value: `**\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\`**`,
            inline: true,
            },
            {   name: '📶 PING',
            value: `**\`${client.ws.ping} ms\`**`,
            inline: true,
            },
            {   name: '\u200b',
            value: `\u200b`,
            inline: true,
            },
            {   name: '📁 Số lượng SERVER',
                value: `**\`${client.guilds.cache.size}\`**`,
                inline: true,
            },
            {   name: '📁 Tổng số thành viên',
                value: `**\`${totalMembers}\`**`,
                inline: true,
            },
            {   name: '📁 Số lượng lệnh',
                value: `**\`${client.commands.map(cmd => cmd.name).length}\`**`,
                inline: true,
            },
            {   name: '__**CÀI ĐẶT TÙY CHỈNH:**__',
            value: `\u200b`,
            inline: false,
            },
            {   name: "📌 SERVER PREFIX",
            value: `**\`${prefix}\`**`,
            inline: true,
        },
        {   name: "⏳ BOT CHANNELS",
            value: `**${boch}**`,
            inline: true,
        },
        {   name: "🎧 DJ-ROLES",
            value: `**${djs}**`,
            inline: true,
        },            
    {   name: "⚙️ Số lượng lệnh được sử dụng",
        value: `**\`${client.infos.get("global", "cmds")}\`**`,
        inline: true,
    },
    {   name: "🎧 Số lượng bài hát đã phát",
    value: `**\`${client.infos.get("global", "songs")}\`**`,
    inline: true,
    },
    {   name: "🔉 Số lượng Bộ lọc đã được thêm vào",
    value: `**\`${client.infos.get("global", "filters")}\`**`,
    inline: true,
    },

       
        ).addField("\u200b", `
    \u200b
    `)
    
    .addField("***Bot Wibu***", `
    >>> <@788208207465938954>  \`VinhBot#3466\` [FACEBOOK](https://www.facebook.com/profile.php?id=100063748987527)
    `) .addField("***SUPPORT:***", `
    >>> [DISCORD]() || [MỜI BOT](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot)
    `).setFooter(client.user.username, config.AVATARURL)
    message.channel.send(embed)
  }
  };
