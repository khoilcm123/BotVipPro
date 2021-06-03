const config = require("../config.json")
console.log("Loading Setups".brightCyan)
const functions = require("../functions");
const guildonlycounter = new Map();
module.exports = (client) => {
   
   let stateswitch = false;
    client.on("ready", () => {
        console.log(`${client.user.tag} đã sẵn sàng hoạt động`);
        setInterval(() => {
           stateswitch = !stateswitch; //thay đổi trạng thái
           if (stateswitch) client.user.setActivity(`${config.prefix}Wibu Impact`, { type: "PLAYING" });
           else client.user.setActivity(`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Thành viên 😂 | ${client.guilds.cache.size} Server 🤭`, { type: "PLAYING" }); 

        }, 5000); 
    
       
    });
    client.on("guildCreate", guild => {
        console.log("Này, tôi được mời vào Server".yellow)
        client.custom.set(guild.id, {
            playlists: [],
        });
        client.settings.set(guild.id, {
            prefix: config.prefix,
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
        });
        client.setups.set(guild.id, {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            },
            logger: {
                enabled: false,
                channel: "",
            },
            welcome: {
                enabled: false,
                channel: "",
                message: `các bạn hãy dành ra chút ít thời gian đọc luật chung của discord để không bị phạt 1 cách ngu người nhé chúc các bạn có khoảng thời gian vui vẻ cùng ae tròng server ❤❤❤`,
                roles: [],
                background: {
                    enable: true,
                    colors: {
                        "border": config.colors.yes,
                        "username-box": config.colors.yes,
                        "discriminator-box": config.colors.yes,
                        "message-box": config.colors.yes,
                        "title": config.colors.yes,
                        "avatar": config.colors.yes
                    },
                    image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg"
                }
            },
            leave: {
                enabled: false,
                channel: "",
                message: `Tạm biệt từ: ${guild.name}`,
                background: {
                    enable: true,
                    colors: {
                        "border": config.colors.no,
                        "username-box": config.colors.no,
                        "discriminator-box": config.colors.no,
                        "message-box": config.colors.no,
                        "title": config.colors.no,
                        "avatar": config.colors.no
                    },
                    image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg"
                }
            },
            membercount: {
                enabled: false,
                channel: "",
                tempnum: 0,
                message: "🗣 Tất cả thành viên: {member}"
            },
            aichatsystem: {
                enabled: false,
                channel: "",
            },
            ticketsystem: {
                enabled: false,
                guildid: guild.id,
                messageid: "",
                channelid: "",
                parentid: "",
                message: "Xin chào {user}, cảm ơn bạn đã mở một vé! Sẽ có người giúp bạn sớm!",
                adminroles: []
            },
            jointocreate: {
                enabled: false,
                channels: [],
                tempchannels: [],
            },
            counter: {
                enabled: false,
                channel: "",
                number: 0,
                author: client.user.id
            }
        });
        client.apply.set(guild.id, {
            "channel_id": "",
            "f_channel_id": "",
            "QUESTIONS": [{"1":"DEFAULT"}],
            "TEMP_ROLE": "",   
            "accept": "Bạn đã được chấp nhận!",
            "deny": "Bạn đã bị từ chối!"
        })
        client.reactionrole.set(guild.id, 
            {
               reactionroles: [
                   /*
                   {
                      MESSAGE_ID: "",
                      remove_others: false,
                      Parameters: [ 
                          { Emoji: "", Role: "",Roles: ["799066077526491186"] }, 
                      ]
                      
                    },
                    */
              ]
            }
        );
        getAll(client, guild)
    })
    //When a Channel got deleted, try to remove it from the BOTCHANNELS     
    client.on("channelDelete", function (channel) {
        try{client.settings.remove(channel.guild.id, channel.id, `botchannel`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `botchannel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `channel_id`)===channel.id)client.setups.set(channel.guild.id, "", `channel_id`);}catch{}
        try{if(client.setups.get(channel.guild.id, `f_channel_id`)===channel.id)client.setups.set(channel.guild.id, "", `f_channel_id`);}catch{}
        try{if(client.setups.get(channel.guild.id, `logger.channel`)===channel.id)client.setups.set(channel.guild.id, "", `logger.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `welcome.channel`)===channel.id)client.setups.set(channel.guild.id, "", `welcome.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `leave.channel`)===channel.id)client.setups.set(channel.guild.id, "", `leave.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `membercount.channel`)===channel.id)client.setups.set(channel.guild.id, "", `membercount.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `aichatsystem.channel`)===channel.id)client.setups.set(channel.guild.id, "", `aichatsystem.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `ticketsystem.parentid`)===channel.id)client.setups.set(channel.guild.id, "", `ticketsystem.parentid`);}catch{}
        try{if(client.setups.get(channel.guild.id, `ticketsystem.channelid`)===channel.id)client.setups.set(channel.guild.id, "", `ticketsystem.channelid`);}catch{}
        try{if(client.setups.get(channel.guild.id, `counter.channel`)===channel.id)client.setups.set(channel.guild.id, "", `counter.channel`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `jointocreate.channels`);}catch{}
    });
    //When a Role got deleted, try to remove it from the DJROLES
    client.on("roleDelete", function (role) {   
        try{client.settings.remove(role.guild.id, role.id, `djroles`);}catch{}
        try{if(client.apply.get(role.guild.id, `TEMP_ROLE`)===role.id)client.setups.set(channel.guild.id, "", `TEMP_ROLE`);}catch{}
        try{client.settings.remove(role.guild.id, role.id, `welcome.roles`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `ticketsystem.adminroles`);}catch{}
    });
    client.on("message", async message => {
        if(!message.guild) return;
        if(message.author.bot) return;
        client.custom.ensure(message.guild.id, {
            playlists: [],
        });
        client.custom2.ensure(message.author.id, {
            myplaylists: [],
        });
        client.infos.ensure("global", {
            cmds: 0,
            songs: 0,
            filters: 0,
        })
        client.settings.ensure(message.guild.id, {
            prefix: config.prefix,
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
        });
        client.custom2.ensure(message.author.id, {
            myplaylists: [],
        });
        client.setups.ensure(message.guild.id, {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            },
            logger: {
                enabled: false,
                channel: "",
            },
            welcome: {
                enabled: false,
                channel: "",
                message: `các bạn hãy dành ra chút ít thời gian đọc luật chung của discord để không bị phạt 1 cách ngu người nhé chúc các bạn có khoảng thời gian vui vẻ cùng ae tròng server ❤❤❤`,
                roles: [],
                background: {
                    enable: true,
                    colors: {
                        "border": config.colors.yes,
                        "username-box": config.colors.yes,
                        "discriminator-box": config.colors.yes,
                        "message-box": config.colors.yes,
                        "title": config.colors.yes,
                        "avatar": config.colors.yes
                    },
                    image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg"
                }
            },
            leave: {
                enabled: false,
                channel: "",
                message: `Good bye from: ${message.guild.name}`,
                background: {
                    enable: true,
                    colors: {
                        "border": config.colors.no,
                        "username-box": config.colors.no,
                        "discriminator-box": config.colors.no,
                        "message-box": config.colors.no,
                        "title": config.colors.no,
                        "avatar": config.colors.no
                    },
                    image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg"
                }
            },
            membercount: {
                enabled: false,
                channel: "",
                tempnum: 0,
                message: "🗣 Tất cả thành viên: {member}"
            },
            aichatsystem: {
                enabled: false,
                channel: "",
            },
            ticketsystem: {
                enabled: false,
                guildid: message.guild.id,
                messageid: "",
                channelid: "",
                parentid: "",
                message: "Xin chào {user}, cảm ơn bạn đã mở một vé! Sẽ có người giúp bạn sớm!",
                adminroles: []
            },
            jointocreate: {
                enabled: false,
                channels: [],
                tempchannels: [],
            },
            counter: {
                enabled: false,
                channel: "",
                number: 0,
                author: client.user.id
            }
        });
        client.reactionrole.ensure(message.guild.id, 
            {
               reactionroles: [
                   /*
                   {
                      MESSAGE_ID: "",
                      remove_others: false,
                      Parameters: [ 
                          { Emoji: "", Role: "",Roles: ["799066077526491186"] }, 
                      ]
                      
                    },
                    */
              ]
            }
        );
        client.apply.ensure(message.guild.id, {
            "channel_id": "",
            "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
            "QUESTIONS": [{"1":"DEFAULT"}],
            "TEMP_ROLE": "",   
            "accept": "You've got accepted!",
            "deny": "You've got denied!"
           })
        
    });
    const { MessageEmbed } = require("discord.js");
    const { stripIndents } = require("common-tags");
    function getAll(client, guild) {    
        const embed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle('Menu Trợ giúp - CẢM ƠN ĐÃ MỜI TÔI VÀO SERVER!')
                .addField("**__Người sáng lập:__**", `
                >>> <@788208207465938954> \`VinhBot#3466\` [facebook](https://www.facebook.com/profile.php?id=100063748987527) | [MỜI BOT](https://discord.com/api/oauth2/authorize?client_id=842012619320983573&permissions=0&scope=bot)
                `)
            .setFooter("Để xem mô tả lệnh và kiểu sử dụng < Prefix >help [CMD Name]", client.user.displayAvatarURL())
            
            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(", ");
            }
        
            const info = client.categories
                .map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
                .reduce((string, category) => string + "\n\n" + category);
        let channel = guild.channels.cache.find(
            channel =>
              channel.type === "text" &&
              channel.permissionsFor(guild.me).has("SEND_MESSAGES")
          );
         channel.send(embed.setDescription(info.substr(0,1950) + `\`... để xem tất cả các loại cmds khác: \`${config.prefix}help\``));
         channel.send("**DISCORD CHÍNH THỨC CỦA BOT:**\nhttps://discord.gg/HGd5uJ7eV8")
        }
    client.on('voiceStateUpdate', (oldState,newState) => {
        if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
            {
                try{
                    const channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "text" &&
                          ( channel.name.includes("cmd") ||channel.name.includes("command") ||  channel.name.includes("bot") ) &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send("\`Đừng bật tiếng tôi! Điều này bảo mật Dữ liệu để mang lại cho bạn trải nghiệm nhanh hơn và mượt mà hơn\`")
                      let queue = client.distube.getQueue(newState.member.guild.id);
                      if(!queue) return console.log("NO QUEUE");
                      queue.connection.voice.setDeaf(true);
                }catch (error) {
                    try{
                        console.log(error)
                        const channel = newState.member.guild.channels.cache.find(
                            channel =>
                              channel.type === "text" &&
                              channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                          );
                          channel.send("Đừng bật tiếng tôi!, Điều này bảo mật Dữ liệu để mang lại cho bạn trải nghiệm nhanh hơn và mượt mà hơn")
                          let queue = client.distube.getQueue(newState.member.guild.id);
                          if(!queue) return console.log("NO QUEUE");
                          queue.connection.voice.setDeaf(true);
                    }catch (error) {
                        console.log(error)
                    }
                }
                
        }
       
    });
   
    console.log("Đã tải thiết lập".brightGreen)
}
