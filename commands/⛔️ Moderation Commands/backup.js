const Discord = require("discord.js");
const config = require("../../config.json")
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");
module.exports = {
    name: "backup",
    aliases: [""],
    category: "⛔️ Moderation Commands",
    description: "\`Trình quản lý sao lưu, để tạo, tải, tìm nạp các bản sao lưu, ...\`",
    usage: "tạo bản sao lưu - lưu từ máy chủ này\ntải dự phòng <ID> - Tải vào và từ máy chủ này\nthông tin sao lưu <ID> - Hiển thị thông tin về bản sao lưu này\n danh sách sao lưu [SERVERID] - Hiển thị danh sách Máy chủ này / chủ khác\nsao lưu loadother <SERVERID> <ID> - Tải sao lưu từ máy chủ khác nhau",
    run: async (client, message, args) => {
        if(!args[0])
        return message.reply(new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("\`HÃY SỬ DỤNG THÔNG SỐ HỢP LỆ!\`")
        .setDescription("< prefix > tạo sao lưu `- *lưu từ máy chủ này*\n`<prefix> tải sao lưu <ID>` - *Tải vào và từ máy chủ này* \n`<prefix> thông tin sao lưu <ID>`- *Hiển thị thông tin về bản sao lưu này*\n` <prefix>danh sách sao lưu [SERVERID] `- *Hiển thị danh sách của Máy chủ này / Máy chủ khác *\n` <prefix> bộ tải sao lưu <SERVERID> <ID>` - * Tải sao lưu từ Máy chủ khác *")
        ).catch(e=>console.log(e.stack.toString().red))
        
        if(args[0].toLowerCase() === "create"){
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.reply("\`Bạn phải là quản trị viên của máy chủ này để yêu cầu sao lưu!\`").catch(e=>console.log(e.stack.toString().red));
            }
            if(!message.guild.me.hasPermission("ADMINISTRATOR")){
                return message.reply("\`TÔI ĐANG BỎ LỠ GIẤY PHÉP\`").catch(e=>console.log(e.stack.toString().red));
            }
            
            message.reply("Đang tải...")
        
            backup.create(message.guild, {
                jsonBeautify: true,
            }).then((backupData) => {
                message.reply(new Discord.MessageEmbed().setColor("GREEN").setTitle("\`DỰ PHÒNG ĐƯỢC TẠO VÀ LƯU!\`").setDescription("\`Bạn sẽ tìm thấy ID trong DMS của mình\`"))
                message.author.send("\`Bản sao lưu đã được tạo! Để tải nó, hãy nhập lệnh này trên máy chủ bạn chọn: `< prefix > backup load\` "+backupData.id+"`!");
                console.log(backupData.id); 
            });
        }
        else if(args[0].toLowerCase() === "load"){
        
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: \`| Bạn phải là quản trị viên của máy chủ này để tải bản sao lưu!\`");
        }
        if(!message.guild.me.hasPermission("ADMINISTRATOR")){
            return message.reply("\`TÔI ĐANG BỎ LỠ GIẤY PHÉP\`").catch(e=>console.log(e.stack.toString().red));
        }
        if(args[2]){
            try{
                let guild = await client.guilds.fetch(args[1]);
                let backupID = args[2];
                if(!backupID){
                    return message.channel.send(":x: \`| Bạn phải chỉ định một ID dự phòng hợp lệ!: < prefix > backup loadother <SERVERID> <ID>\`");
                }
                message.reply("LOADING...")
    
        
                backup.fetch(backupID).then(async () => {
      
                    message.channel.send(":warning: | \`Khi bản sao lưu được tải, tất cả các kênh, vai trò, v.v. sẽ được thay thế! Gõ `confirm` để xác nhận!\`");
                        await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        }).catch((err) => {
                           
                            return message.channel.send("⌚ \`| Hết giờ rồi! Đã hủy tải bản sao lưu!\`");
                        });
                      
                        message.author.send(":white_check_mark: \`| Bắt đầu tải bản sao lưu!\`");
                     
                        backup.load(backupID, message.guild).then(() => {
                           
                            backup.remove(backupID);
                        }).catch((err) => {
                            
                            return message.author.send(":x: | \`Xin lỗi, đã xảy ra lỗi ... Vui lòng kiểm tra xem tôi có quyền quản trị viên ( ADMIN ) không!\`");
                        });
                }).catch((err) => {
                    console.log(err);
                    return message.channel.send(":x: \`| Không tìm thấy bản sao lưu nào cho:\` `"+backupID+"`!");
                });
            }catch{
                return message.reply("\`KHÔNG THỂ NHẬN THÔNG TIN VỀ ID MÁY CHỦ NÀY!\`")
            }
        }
        else{
            let backupID = args[1];
            if(!backupID){
                return message.channel.send(":x: \`| Bạn phải chỉ định một ID dự phòng hợp lệ !: < prefix > backup load <ID>\`");
            }
            message.reply("Đang tải...")
            
            backup.fetch(backupID).then(async () => {
          
                message.channel.send(":warning: | Khi bản sao lưu được tải, tất cả các kênh, vai trò, v.v. sẽ được thay thế! Gõ `confirm` để xác nhận!");
                    await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                        max: 1,
                        time: 20000,
                        errors: ["time"]
                    }).catch((err) => {
               
                        return message.channel.send("⌚ \`| Hết giờ rồi! Đã hủy tải bản sao lưu!\`");
                    });
                  
                    message.author.send(":white_check_mark: \`| Bắt đầu tải bản sao lưu!\`");
                  
                    backup.load(backupID, message.guild).then(() => {
                       
                        backup.remove(backupID);
                    }).catch((err) => {
                      
                        return message.author.send(":x: \`| Xin lỗi, đã xảy ra lỗi ... Vui lòng kiểm tra xem tôi có quyền quản trị viên ( ADMIN ) không!\`");
                    });
            }).catch((err) => {
                console.log(err);
            
                return message.channel.send(":x: \`| Không tìm thấy bản sao lưu nào cho\` `"+backupID+"`!");
            });
        }
        }   
        else if(args[0].toLowerCase() === "info"){
            let backupID = args[1];
            if(!backupID){
                return message.channel.send(":x: \`| Bạn phải chỉ định một ID dự phòng hợp lệ!: < prefix > backup infos <ID>\`");
            }
            message.reply("Đang tải...")
        
          
            backup.fetch(backupID).then((backupInfos) => {
                const date = new Date(backupInfos.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Thông tin dự phòng")
              
                    .addField("ID dự phòng", backupInfos.id, false)

                    .addField("ID server", backupInfos.data.guildID, false)
          
                    .addField("Kích thước", `${backupInfos.size} kb`, false)
                   
                    .addField("Được tạo lúc", formatedDate, false)
                    .setColor("#FF0000");
                message.channel.send(embed);
            }).catch((err) => {
                
                return message.channel.send(":x: \`| Không tìm thấy bản sao lưu nào cho\` `"+backupID+"`!");
            });
        }
        else if(args[0].toLowerCase() === "list"){
            if(args[1]){
                try{
                    let guild = await client.guilds.fetch(args[1]);
                    message.reply("Đang tải...")
        
                    backup.list(guild).then((backups) => {
                        let embed = new Discord.MessageEmbed()
                        .setColor(config.colors.yes)
                        .setTitle("BACKUPS OF: "+ String(guild.name).toUpperCase())
                        embed.setDescription("`"+backups.join("`\n`") + "`")
                        embed.addField("NHẬN THÔNG TIN", "\`để nhận thông tin về Bản sao lưu, hãy nhập: <prefix> backup info <ID>\`")
                        message.channel.send(embed)
                    });
                }catch{
                    return message.reply("\`KHÔNG THỂ NHẬN THÔNG TIN VỀ ID MÁY CHỦ NÀY!\`")
                }
            }
            else{
                backup.list().then((backups) => {
                    let embed = new Discord.MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("BACKUPS CỦA MÁY CHỦ NÀY!")
                    embed.setDescription("`"+backups.join("`\n`") + "`")
                    embed.addField("NHẬN THÔNG TIN", " để nhận thông tin về Bản sao lưu, hãy nhập://backup info <ID>")
                    message.channel.send(embed)
                });
            }
            /////////////////////////////////////////////////////////////////////////////  ĐÃ VIỆT HÓA ĐẾN ĐÂY  ////////////////////////////////////////////////////////////////////////////
        }
        else  if(args[0].toLowerCase() === "loadother"){
        
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
            }
            if(!message.guild.me.hasPermission("ADMINISTRATOR")){
                return message.reply("I AM MISSING PERMISSIONS").catch(e=>console.log(e.stack.toString().red));
            }
            if(args[1]){
                try{
                    let guild = await client.guilds.fetch(args[1]);
                    let backupID = args[2];
                    if(!backupID){
                        return message.channel.send(":x: | You must specify a valid backup ID!: `//backup loadother <SERVERID> <ID>`");
                    }
                    message.reply("LOADING...")
        
                    
                    backup.fetch(backupID).then(async () => {
                        
                        message.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `confirm` to confirm!");
                            await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                                max: 1,
                                time: 20000,
                                errors: ["time"]
                            }).catch((err) => {
                                
                                return message.channel.send(":x: | Time's up! Cancelled backup loading!");
                            });
                            
                            message.author.send(":white_check_mark: | Start loading the backup!");
                            
                            backup.load(backupID, message.guild).then(() => {
                                
                                backup.remove(backupID);
                            }).catch((err) => {
                                
                                return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
                            });
                    }).catch((err) => {
                        console.log(err);
                    
                        return message.channel.send(":x: | No backup found for `"+backupID+"`!");
                    });
                }catch{
                    return message.reply("CANNOT GET INFORMATION ABOUT THIS SERVER ID!")
                }
            }
           
        }   
        else  return message.reply(new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("PLEASE USE A VALID PARAMETER!")
        .setDescription("`//backup create` -- *saves from this server*\n`//backup load <ID>` -- *Loads in&from this server*\n`//backup info <ID>` -- *Shows info of this backup*\n`//backup list [SERVERID]` -- *Shows list of this/other Server*\n`//backup loadother <SERVERID> <ID>` -- *Loads Backup from Different Server*")
        ).catch(e=>console.log(e.stack.toString().red))
    }
}
