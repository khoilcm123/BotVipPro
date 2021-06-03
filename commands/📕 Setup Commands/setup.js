const functions = require("../../functions")
const config = require("../../config.json");
const { MessageEmbed,MessageAttachment } = require("discord.js");
const Discord = require("discord.js")
const Canvacord = require("canvacord");
const { Welcomer, Leaver } = require("canvacord");
module.exports = {
  name: "setup",
  aliases: ["setup"],
  category: "📕 Setup Commands",
  description: "\`Hiển thị danh sách các hệ thống thiết lập có sẵn!\`",
  usage: "setup",
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "SETUPS", `❌ Bạn\' không có quyền cho Lệnh này!`)
   let embed = new MessageEmbed()
   .setColor(config.colors.yes)
   .setTitle("Bạn muốn thiết lập gì?")
   .setDescription(`
**1.** \`Welcome/Leave System\`
**2.** \`Ticket System\`
**3.** \`Ranking System\`
**4.** \`Join to Create\`
**5.** \`AI-CHAT System\`
**6.** \`Counter Chat System\`
**7.** \`Member Counter Channel\`
**8.** \`Logger System\`
**9.** \`Application System\`
**10.** \`Reaction Role System\`
`).addField("**__facebook__**", "https://www.facebook.com/Khoilcm.vn/")

   .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
   .setThumbnail(config.AVATARURL)


   message.reply(embed).then(msg => {
  msg.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected=>{
    switch(collected.first().content.toString()){
      case "1":
        welcomesystem();
      break;
      case "2":
        ticketsystem();
      break;
      case "3":
        rankingsystem();
      break;
      case "4":
        jointocreatesystem();
      break;
      case "5":
        aichat();
      break;
      case "6":
        counter()
      break;
      case "7":
        membercountsystem();
      break;
      case "8":
        loggersystem();
      break;
      case "9":
        applysystem();
      break;
      case "10":
        reactionrolesystem()
      break;
      default:
        message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
      break;

    }
  }).catch(error=>{
    console.log(error)
    return message.reply("Hết thời gian rồi, xin lỗi nha!")
})
})
/**
 * @APPLYSYSTEM NOT FINISHED
 */
function applysystem(){
  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Create Setup\` - *Tạo MỘT Hệ thống Ứng dụng*
**2.** \`Edit Setup\` - *Chỉnh sửa Hệ thống ứng dụng hiện có*
**3.** \`Reset\` - *Đặt lại cài đặt cho hệ thống Ứng dụng*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
      case "1":
        let color = "GREEN";
        let desc;
        let userid = message.author.id;

        message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Đang cài đặt...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(message.guild.name, message.guild.iconURL({dynamic:true})))
        message.guild.channels.create("📋 | Applications", {
            type: "category",
        }).then(ch=>{
            ch.guild.channels.create("✔️|finished-applies", {
                type: "text",
                topic: "Phản ứng với Embed, để bắt đầu quy trình ứng dụng",
                parent: ch.id,
                permissionOverwrites: [
                    {
                        id: ch.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(ch=> {
                client.apply.set(ch.guild.id, ch.id, "f_channel_id")
            })
            ch.guild.channels.create("✅|apply-here", {
                type: "text",
                topic: "Phản ứng với Embed, để bắt đầu quy trình ứng dụng",
                parent: ch.id,
                permissionOverwrites: [
                    {
                        id: ch.guild.id,
                        allow: ["VIEW_CHANNEL"],
                        deny: ["SEND_MESSAGES"]
                    }
                ]
            }).then(ch=> {
                let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("ORANGE")
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                 message.channel.send(embed.setTitle("Màu nhúng phải là gì?").setDescription("Nó PHẢI là một MÃ HEX dài 7 chữ cái, **with** các `#` (e.g: #ffee55)")).then(msg =>{
                    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let content = collected.first().content;
                        if(!content.startsWith("#") && content.length !== 7){
                            message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                        }
                        else {
                            if(isValidColor(content)){
                                console.log(content)
                                color = content;
                            }
                            else{
                                message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                            }
                        }
                        function isValidColor(str) {
                            return str.match(/^#[a-f0-9]{6}$/i) !== null;
                        }
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("Hết thời gian rồi, sorry nha!")
                    })
                    .then(something=>{
                        message.channel.send(embed.setTitle("TEXT nhúng phải là gì?").setDescription("Giống như những gì bạn muốn liệt kê trong Embed?")).then(msg =>{
                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                                desc = collected.first().content;
                                let setupembed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    .setColor(color)
                                    .setDescription(desc)
                                    .setTitle("Apply for: `" + message.guild.name + "`")
                                    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    ch.send(setupembed).then(msg=>{
                                        msg.react("✅")
                                        client.apply.set(msg.guild.id, msg.channel.id, "channel_id")
                                    });
                                    let counter = 0;
                                    client.apply.set(msg.guild.id, [{"1":"DEFAULT"}], "QUESTIONS")
                                    ask_which_qu();
                                    function ask_which_qu(){
                                        counter++;
                                        if(counter === 25) {
                                            message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setAuthor("Bạn đã đạt đến số lượng Câu hỏi tối đa!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"))
                                            return ask_addrole();
                                        }
                                        message.channel.send(embed.setTitle(`Điều gì nên là **${counter}** Câu hỏi?`).setDescription("Nhập `kết thúc`, nếu bạn đã hoàn thành các Câu hỏi của mình!")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                                                if(collected.first().content.toLowerCase() === "finish") {
                                                    return ask_addrole();
                                                }
                                                switch(counter){
                                                    case 1: { client.apply.set(msg.guild.id, [], "QUESTIONS"); client.apply.push(msg.guild.id, {"1": collected.first().content}, "QUESTIONS");}break;
                                                    case 2: client.apply.push(msg.guild.id, {"2": collected.first().content}, "QUESTIONS");break;
                                                    case 3: client.apply.push(msg.guild.id, {"3": collected.first().content}, "QUESTIONS");break;
                                                    case 4: client.apply.push(msg.guild.id, {"4": collected.first().content}, "QUESTIONS");break;
                                                    case 5: client.apply.push(msg.guild.id, {"5": collected.first().content}, "QUESTIONS");break;
                                                    case 6: client.apply.push(msg.guild.id, {"6": collected.first().content}, "QUESTIONS");break;
                                                    case 7: client.apply.push(msg.guild.id, {"7": collected.first().content}, "QUESTIONS");break;
                                                    case 8: client.apply.push(msg.guild.id, {"8": collected.first().content}, "QUESTIONS");break;
                                                    case 9: client.apply.push(msg.guild.id, {"9": collected.first().content}, "QUESTIONS");break;
                                                    case 10: client.apply.push(msg.guild.id, {"10": collected.first().content}, "QUESTIONS");break;
                                                    case 11: client.apply.push(msg.guild.id, {"11": collected.first().content}, "QUESTIONS");break;
                                                    case 12: client.apply.push(msg.guild.id, {"12": collected.first().content}, "QUESTIONS");break;
                                                    case 13: client.apply.push(msg.guild.id, {"13": collected.first().content}, "QUESTIONS");break;
                                                    case 14: client.apply.push(msg.guild.id, {"14": collected.first().content}, "QUESTIONS");break;
                                                    case 15: client.apply.push(msg.guild.id, {"15": collected.first().content}, "QUESTIONS");break;
                                                    case 16: client.apply.push(msg.guild.id, {"16": collected.first().content}, "QUESTIONS");break;
                                                    case 17: client.apply.push(msg.guild.id, {"17": collected.first().content}, "QUESTIONS");break;
                                                    case 18: client.apply.push(msg.guild.id, {"18": collected.first().content}, "QUESTIONS");break;
                                                    case 19: client.apply.push(msg.guild.id, {"19": collected.first().content}, "QUESTIONS");break;
                                                    case 20: client.apply.push(msg.guild.id, {"20": collected.first().content}, "QUESTIONS");break;
                                                    case 21: client.apply.push(msg.guild.id, {"21": collected.first().content}, "QUESTIONS");break;
                                                    case 22: client.apply.push(msg.guild.id, {"22": collected.first().content}, "QUESTIONS");break;
                                                    case 23: client.apply.push(msg.guild.id, {"23": collected.first().content}, "QUESTIONS");break;
                                                    case 24: client.apply.push(msg.guild.id, {"24": collected.first().content}, "QUESTIONS");break;
                                                }
                                                ask_which_qu();
                                            }).catch(error=>{
                                                console.log(error)
                                                return message.reply("Hết thời gian rồi, xin lỗi nha!")
                                            })
                                        })
                                    }
                                    function ask_addrole(){
                                        message.channel.send(embed.setTitle(`Bạn có muốn thêm Vai trò khi some1 áp dụng không?`).setDescription("Nhập `không`, nếu không\n\nChỉ ping Vai trò")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected => {
                                                if(collected.first().content.toLowerCase() === "no") {
                                                    return message.reply(`HỆ THỐNG ỨNG DỤNG CỦA BẠN ĐÃ SN SÀNG 2 SỬ DỤNG: ${ch}\n\n*Bạn có thể chỉnh sửa Câu hỏi bằng cách chạy cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: CHỈ MỘT CÀI ĐẶT**/**GUILD`);
                                                }
                                                else{
                                                    let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                                                    if(!role) return message.reply(`KHÔNG THỂ TÌM ĐƯỢC ROLE!\n\nHỆ THỐNG ỨNG DỤNG CỦA BẠN ĐÃ SẴN SÀNG 2 SỬ DỤNG: ${ch}\n\n*Bạn có thể chỉnh sửa Câu hỏi bằng cách chạy cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: CHỈ MỘT CÀI ĐẶT**/**GUILD`)
                                                    let guildrole = message.guild.roles.cache.get(role)
                                                    let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                                                    if(guildrole.position >= botrole.position){
                                                        message.channel.send("Tôi không thể truy cập vào vai trò đó, địa điểm \"me\" / \"role cao nhất của tôi\" trên các vai trò khác mà bạn muốn tôi quản lý.\n\n VÌ VẬY TÔI ĐANG SỬ DỤNG **NO** ROLE, bạn có thể thay đổi nó bằng: `e!editsetup role`")
                                                        return message.reply(`HỆ THỐNG ỨNG DỤNG CỦA BẠN ĐÃ SN SÀNG 2 SỬ DỤNG: ${ch}\n\n*Bạn có thể chỉnh sửa Câu hỏi bằng cách chạy cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: CHỈ MỘT CÀI ĐẶT**/**GUILD`)
                                                    }
                                                        client.apply.set(message.guild.id, role, "TEMP_ROLE")
                                                    return message.reply(`HỆ THỐNG ỨNG DỤNG CỦA BẠN ĐÃ SN SÀNG 2 SỬ DỤNG: ${ch}\n\n*Bạn có thể chỉnh sửa Câu hỏi bằng cách chạy cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: CHỈ MỘT CÀI ĐẶT**/**GUILD`)
                                                }
                                            }).catch(error=>{
                                                console.log(error)
                                                return message.reply("Hết thời gian rồi, xin lỗi nha!")
                                            })
                                        })
                                    }
                                }).catch(error=>{
                                    console.log(error)
                                    return message.reply("Hết thời gian rồi, xin lỗi nha!")
                                })
                        })
                    })
                })
            })
        })
        break;
        case "2":
          let rrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`acceptmsg\` - *Chỉnh sửa là tin nhắn chấp nhận!*
**2.** \`denymsg\` - *Chỉnh sửa là thông báo từ chối!*
**3.** \`question\` - *Chỉnh sửa một câu hỏi trong số tất cả các câu hỏi*
**4.** \`role\` - *Chỉnh sửa Role*
**5.** \`addquestion\` - *Thêm câu hỏi vào câu hỏi*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rrembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
          switch(collected.first().content.toString()){
            case "1":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Tin nhắn chấp nhận mới nên là gì?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        client.apply.set(message.guild.id, collected.first().content, "accept")
                        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Đã thay đổi thành công THÔNG ĐIỆP CHẤP NHẬN!", message.author.displayAvatarURL({dynamic:true})))
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("Hết thời gian rồi, xin lỗi nha!")
                    })
                })
            }
            break;
            case "2":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Thông điệp từ chối mới nên là gì?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        client.apply.set(message.guild.id, collected.first().content, "deny")
                        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Đã thay đổi thành công THÔNG ĐIỆP TỪ CHỐI!", message.author.displayAvatarURL({dynamic:true})))
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("Hết thời gian rồi, xin lỗi nha!")
                    })
                })
            }
            break;
            case "3":

            {
                    let Questions = client.apply.get(message.guild.id, "QUESTIONS");

                    let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                    .setColor(config.colors.yes)
                    .setTitle("Câu hỏi hiện tại") 
                    .setDescription("CÂU HỎI NÀO BẠN MUỐN CHỈNH SỬA?")
                    .setFooter("THÊM CHỈ SỐ ĐỂ CHỈNH SỬA", message.guild.iconURL({dynamic: true}))
                    .setTimestamp()

                    for(let i = 0; i < Questions.length; i++){
                        try{
                            embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                        }catch (e){
                        console.log(e)
                        }
                    }

                    message.channel.send(embed).then(msg=>{
                      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{


                        let arr = client.apply.get(message.guild.id, "QUESTIONS");
                            if(arr.length >= Number(collected.first().content)){
                                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Câu hỏi mới nên là gì?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                                        const index = Number(collected.first().content);
                                        var obj;
                                        switch(Number(index)){
                                            case 1: obj =  {"1": collected.first().content};break;
                                            case 2: obj =  {"2": collected.first().content};break;
                                            case 3: obj =  {"3": collected.first().content};break;
                                            case 4: obj =  {"4": collected.first().content};break;
                                            case 5: obj =  {"5": collected.first().content};break;
                                            case 6: obj =  {"6": collected.first().content};break;
                                            case 7: obj =  {"7": collected.first().content};break;
                                            case 8: obj =  {"8": collected.first().content};break;
                                            case 9: obj =  {"9": collected.first().content};break;
                                            case 10: obj =  {"10": collected.first().content};break;
                                            case 11: obj =  {"11": collected.first().content};break;
                                            case 12: obj =  {"12": collected.first().content};break;
                                            case 13: obj =  {"13": collected.first().content};break;
                                            case 14: obj =  {"14": collected.first().content};break;
                                            case 15: obj =  {"15": collected.first().content};break;
                                            case 16: obj =  {"16": collected.first().content};break;
                                            case 17: obj =  {"17": collected.first().content};break;
                                            case 18: obj =  {"18": collected.first().content};break;
                                            case 19: obj =  {"19": collected.first().content};break;
                                            case 20: obj =  {"20": collected.first().content};break;
                                            case 21: obj =  {"21": collected.first().content};break;
                                            case 22: obj =  {"22": collected.first().content};break;
                                            case 23: obj =  {"23": collected.first().content};break;
                                            case 24: obj =  {"24": collected.first().content};break;
                                        }
                                        arr[index-1] = obj;
                                        client.apply.set(message.guild.id, arr, "QUESTIONS")
                                        Questions = client.apply.get(message.guild.id, "QUESTIONS");
                                        let new_embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                            .setColor(config.colors.yes)
                                            .setTitle("NEW Questions") //Tomato#6966
                                            .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                                            .setTimestamp()
                                        for(let i = 0; i < Questions.length; i++){
                                            try{
                                                new_embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                                            }catch{
                                            }
                                        }
                                        message.channel.send(new_embed);
                                    }).catch(error=>{
                                        console.log(error)
                                        return message.reply("Hết thời gian rồi, xin lỗi nha!")
                                    })
                                })
                            }else{
                                 message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setAuthor("Có vẻ như, rằng Câu hỏi này không tồn tại! Làm ơn hãy thử lại! Đây là tất cả các câu hỏi:", message.author.displayAvatarURL({dynamic:true})))
                                 return message.channel.send(embed);
                            }

                          })
                          .catch(e=>{
                            return message.reply("Hết thời gian rồi, xin lỗi nha!, đã bị hủy")
                          })
                        })
            }
            break;
            case "4":
                message.channel.send("role mới nên là gì?\n\nChỉ cần ping nó!").then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        if(!collected.first().mentions.roles) return message.reply("BẠN đã không ping một role nào cả!")
                        let roleid = collected.first().mentions.roles.map(role => role.id)[0];
                        let guildrole = message.guild.roles.cache.get(roleid)
                        let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                        if(guildrole.position >= botrole.position){
                            return message.channel.send("Tôi không thể truy cập vào vai trò đó, địa điểm \"tôi\" / \"role cao nhất của tôi\" phía trên các vai trò khác mà bạn muốn tôi quản lý.")
                        }
                        client.apply.set(message.guild.id, roleid, "TEMP_ROLE")
                        return message.reply("ĐÃ THAY ĐỔI THÀNH CÔNG TEMP_ROLE!")
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("Hết thời gian rồi, xin lỗi nha!")
                    })
                })
            break;
            case "5":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Câu hỏi nào cần được thêm vào?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let Questions = client.apply.get(message.guild.id, "QUESTIONS")
                        let obj;
                        switch(Questions.length+1){
                            case 1: obj =  {"1": collected.first().content};break;
                            case 2: obj =  {"2": collected.first().content};break;
                            case 3: obj =  {"3": collected.first().content};break;
                            case 4: obj =  {"4": collected.first().content};break;
                            case 5: obj =  {"5": collected.first().content};break;
                            case 6: obj =  {"6": collected.first().content};break;
                            case 7: obj =  {"7": collected.first().content};break;
                            case 8: obj =  {"8": collected.first().content};break;
                            case 9: obj =  {"9": collected.first().content};break;
                            case 10: obj =  {"10": collected.first().content};break;
                            case 11: obj =  {"11": collected.first().content};break;
                            case 12: obj =  {"12": collected.first().content};break;
                            case 13: obj =  {"13": collected.first().content};break;
                            case 14: obj =  {"14": collected.first().content};break;
                            case 15: obj =  {"15": collected.first().content};break;
                            case 16: obj =  {"16": collected.first().content};break;
                            case 17: obj =  {"17": collected.first().content};break;
                            case 18: obj =  {"18": collected.first().content};break;
                            case 19: obj =  {"19": collected.first().content};break;
                            case 20: obj =  {"20": collected.first().content};break;
                            case 21: obj =  {"21": collected.first().content};break;
                            case 22: obj =  {"22": collected.first().content};break;
                            case 23: obj =  {"23": collected.first().content};break;
                            case 24: obj =  {"24": collected.first().content};break;
                        }
                        client.apply.push(message.guild.id, obj, "QUESTIONS")
                        message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Đã thêm thành công câu hỏi của bạn!", message.author.displayAvatarURL({dynamic:true})))
                        Questions = client.apply.get(message.guild.id, "QUESTIONS");
                        let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                        .setColor(config.colors.yes)
                        .setTitle("Câu hỏi MỚI") 
                        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                        .setTimestamp()
                        for(let i = 0; i < Questions.length; i++){
                            try{
                                embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                            }catch (e){
                            console.log(e)
                            }
                        }
                        message.channel.send(embed);
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("Hết thời gian rồi, xin lỗi nha!")
                    })
                })
            }
            break;
            default:
            message.reply(String("XIN LỖI, Số đó không tồn tại :(\nĐầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
          break;

        }
        })
      })
          break;
          case "3":
            client.apply.set(message.guild.id, {
              "channel_id": "",
              "f_channel_id": "", 
              "QUESTIONS": [{"1":"DEFAULT"}],
              "TEMP_ROLE": "",
              "accept": "Bạn đã được chấp nhận!",
              "deny": "Bạn đã bị từ chối!"
             })
             message.reply("Đã đặt lại thành công Hệ thống ứng dụng!")
             break;
        default:
          break;
      }
    })
  })
}
/**
 * @REACTIONROLESYSTEM FINISHED
 */
function reactionrolesystem(){
  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Tạo vai trò phản ứng mới\` - *Tạo một role phản ứng mới*
**2.** \`Đặt lại cài đặt\` - *Đặt lại cài đặt cho role phản ứng*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        switch(collected.first().content){
          case "1":
            let rembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle("ĐÂY LÀ THÔNG TIN ĐƯỢC KẾT THÚC!")
            .setDescription(`
       **Cách thiết lập Vai trò phản ứng của Wibu Bot**
       > 1. Phản ứng với tin nhắn __BELOW__ ** tin nhắn này **

       > 2. Sau đó, sau đó một thông báo mới xuất hiện! Sau đó, bạn có thể PING role cho EMOJI đã phản ứng

       > 3. Quá trình 1 ... tiếp tục, hãy nhập \`finish\` để kết thúc quá trình! (hoặc chỉ không phản ứng)

       > 4. Sau khi hoàn thành:

       > 4.1 Tôi sẽ hỏi bạn, bạn muốn vai phản ứng **kiểu** nào!
           | - **Multiple** = *bạn có thể có mọi tùy chọn phản ứng có thể có!*
           | - **Single** = *Chỉ một vai trò cùng một lúc!*
       > 4.2 Bạn sẽ được yêu cầu TITLE của Vai trò phản ứng, điều đó là cần thiết!
       > 4.3 Sau đó, hãy nhập kênh mà bạn muốn liệt kê Vai trò phản ứng của mình! Chỉ cần ping nó! \`#chat\`
       > 4.4 Sau đó, Nhúng vai trò phản ứng, với thông tin cho mọi Tham số: \`EMOJI = ROLE \`, sẽ được gửi đến kênh mong muốn của bạn và nó sẽ hoạt động!

       *Bạn có 30 giây cho mỗi đầu vào!*
       `)
        .setThumbnail(config.AVATARURL)
            .setFooter("Wibu Bot", config.AVATARURL)
            message.channel.send(rembed)
            let objet = {
              MESSAGE_ID: "",
              remove_others: false,
              Parameters: []
            };
            let counters = 0;
            ask_emoji()

            function ask_emoji(){
              counters++;
              if(counters.length === 21) return finished();
              let object2 = { Emoji: "", Role: "" };
              let rermbed = new MessageEmbed()
              .setColor(config.colors.yes)
              .setTitle("Biểu tượng cảm xúc tiếp theo bạn muốn sử dụng là gì?")
              let cancel = false;
              message.channel.send(rermbed).then(msg => {
                msg.awaitReactions((reaction, user) => user.id == message.author.id,
                { max: 1, time: 30000 }).then(collected => {
                        if (collected.first().emoji.name) {
                          msg.delete();
                          object2.Emoji = collected.first().emoji.name;
                          return ask_role();
                        }
                        else if(collected.first().emoji.id){
                          msg.delete();
                          object2.Emoji = collected.first().emoji.id;
                          return ask_role();
                        }else{
                          message.channel.send('Đã hủy hoạt động. và đã hoàn thiện!');
                          return finished();
                        }
                }).catch(() => {
                        if(!cancel){
                        message.reply('Không có phản ứng sau 30 giây, hoạt động bị hủy');
                        return finished();
                      }
                });
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{ max: 1, time: 30000 }).then(collected => {
                  if(collected.first().content.toLowerCase()=== "finish"){
                    cancel = true;
                    return finished();
                  }
              }).catch(() => {if(!cancel){
                      message.reply('Không có phản ứng sau 30 giây, hoạt động bị hủy');
                      return finished();
                    }
              });
              })
              function ask_role(){
                counters++;
                let rermbed = new MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle("Bạn muốn có role gì cho emoji đó?")
                message.channel.send(rermbed).then(msg => {
                  msg.channel.awaitMessages(m => m.author.id == message.author.id,
                  { max: 1, time: 30000 }).then(collected => {
                    let role = collected.first().mentions.roles.first();
                    if(!role) message.reply("CANCELED, bạn đã không Ping một Vai trò hợp lệ")
                    if (role) {

                      object2.Role = role.id;
                      objet.Parameters.push(object2)


                      try{msg.delete();}catch{}
                      try{msg.channel.bulkDelete(1);}catch{}

                      return ask_emoji();
                    }
                    else{
                      message.channel.send('Đã hủy hoạt động. và đã hoàn thiện!');
                      return finished();
                    }
                  }).catch((e) => {
                    console.log(e)
                          message.reply('Không có phản ứng sau 30 giây, hoạt động bị hủy');
                          return finished();
                  });
                })
              }
            }


            function finished(){
              message.reply("Bạn muốn loại Vai trò phản ứng nào?\n`1` === Nhiều tùy chọn phản ứng\n`2` === Tùy chọn phản ứng đơn").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{
                  switch(collected.first().content){
                    case "1":
                      break;
                      case "2":
                        objet.remove_others = true;
                        break;
                        default:
                            message.reply("KHÔNG CÓ ĐẦU VÀO ĐÚNG! Vì vậy, tôi sẽ sử dụng `LỰA CHỌN PHẢN ỨNG NHIỀU LẦN`")
                          break;
                  }
              message.reply(`tôi sẽ sử dụng${objet.remove_others ? "Single": "Multiple"} Tùy chọn phản ứng!\n\n`+"Điều gì nên là **`Tiêu đề`** role phản ứng của bạn?").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{
                let title = collected.first().content;
              message.reply("Bạn muốn Vai trò phản ứng của mình trở thành kênh nào?").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{

                  if(collected.first().mentions.channels.first()){

                    let channel = collected.first().mentions.channels.first();
                    let embed = new MessageEmbed().setColor(config.colors.yes) .setTitle(title.substr(0, 256)).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                    let buffer = "";
                    for(let i = 0; i< objet.Parameters.length; i++){
                      try{ buffer += objet.Parameters[i].Emoji+ "  **==**  <@&"+objet.Parameters[i].Role+">\n";}catch (e){console.log(e)}
                    }
                    channel.send(embed.setDescription(buffer)).then(msg=>{
                      for(let i = 0; i< objet.Parameters.length; i++){
                        try{msg.react(objet.Parameters[i].Emoji).catch(e=>console.log(e))}catch (e){ console.log(e)}
                      }
                      objet.MESSAGE_ID = msg.id;
                      client.reactionrole.push(message.guild.id, objet, "reactionroles");
                      message.reply("VAI TRÒ PHẢN ỨNG CỦA BẠN ĐÃ KẾT THÚC VÀ SN SÀNG ĐỂ SỬ DỤNG! <#" + msg.channel.id + ">")
                    })

                  }
                  else{
                    message.reply('Bạn\' chưa Ping KÊNH, ĐÃ HỦY!');
                    return;
                  }
                }).catch(e=>console.log(e))
              })
            }).catch(e=>console.log(e))
          })
        }).catch(e=>console.log(e))
      })
            }
          break;
          case "2":
            client.reactionrole.set(message.guild.id,
              {
                 reactionroles: [
                ]
              }
          );
          return message.reply("Đã đặt lại thành công, Thiết lập ReactionRole!")

          break;
          default:
            message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
          break;

        }


      }).catch(e=>console.log(e))

    });
}
/**
 * @welcomesystem FINISHED
 */
function welcomesystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Hệ thống chào mừng\` - *Tạo MỘT kênh Chào mừng*
**2.** \`Rời khỏi hệ thống\` - *Tạo một hệ kênh leave*
**3.** \`Đặt lại-Cả hai\` - *Đặt lại cài đặt cho Chào mừng và Rời khỏi Thiết lập*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
        _welcome();
        break;
        case "2":
        _leave();
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
                channel: "",
                message: `Chúng tôi hy vọng rằng bạn thích nó ở đây!`,
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
          }, "welcome")
          client.setups.set(message.guild.id, {
            enabled: true,
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
          }, "leave")
          return message.reply("Thành công, đã thiết lập lại WELCOME và RỜI khỏi thiết lập")
          break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })

  function _welcome(){
    let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**0.** \`Tạo thiết lập\` - *Tạo thiết lập kênh Welcome!*
**1.** \`Quản lý tin nhắn\` - *Hãy để bạn chỉnh sửa Thông điệp Welcome*
**2.** \`Quản lý role\` - *Hãy để bạn thêm/xóa role khỏi role Welcome*
**3.** \`Manage Image\` - *Hãy để bạn quản lý các cài đặt cho Hình nền*
**4.** \`Reset\` - *Đặt lại cài đặt cho Thiết lập Welcome*
${!client.setups.get(message.guild.id, "welcome.enabled") ?
`**5.** \`Bật Welcome\` - *Cho phép Welcome*` :
`**5.** \`Tắt Welcome\` - *Tắt Welcome*`}
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          let bg = client.setups.get(message.guild.id, "welcome.background.image")

          let image = new Canvacord.Welcomer()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(message.guild.id, "welcome.background.colors.border"))
              .setColor("username-box", client.setups.get(message.guild.id, "welcome.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(message.guild.id, "welcome.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(message.guild.id, "welcome.background.colors.message-box"))
              .setColor("title", client.setups.get(message.guild.id, "welcome.background.colors.title"))
              .setColor("avatar", client.setups.get(message.guild.id, "welcome.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "welcome-image.png");


        message.guild.channels.create("👋welcome", {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ['READ_MESSAGE_HISTORY'],
              deny: ['SEND_MESSAGES'],
            },
          ],
        })
        .then((channel) => {

          let embed = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Chào mừng bạn đến với: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://welcome-image.png").setTimestamp()
          channel.send(embed);
          client.setups.set(message.guild.id, true, "welcome.enabled")
          client.setups.set(message.guild.id, channel.id, "welcome.channel")
          return message.reply("<#"+channel.id+ "> | Thiết lập Welcome của bạn đã hoàn tất ngay bây giờ! Chạy lại cmd `<prefix>setup` để điều chỉnh Vai trò, Thông điệp Welcome và Hình nền!")
        })
        break;
        case "1":
          message.channel.send("Nhập tin nhắn của bạn ngay bây giờ!").then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              client.setups.set(message.guild.id, collected.first().content, "welcome.message")
              return message.reply("Đặt thành công thông báo Welcome!")
            }).catch(error=>{
              console.log(error)
              return message.reply("Hết thời gian rồi, xin lỗi nha!")
          })
          })
        break;
        case "2":
        let rrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Add Role\` - *Thêm vai trò cho thiết lập Welcome*
**2.** \`Remove Role\` - *Xóa vai trò khỏi thiết lập Welcome*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
            switch(collected.first().content.toString()){
              case "1":
                message.channel.send("Ping role của bạn ngay bây giờ!").then(msg=>{
                  msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                    let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                    if(!role) return message.reply(`KHÔNG THỂ TÌM ĐƯỢC VAI TRÒ! Vui lòng thử thiết lập lại`)
                    let guildrole = message.guild.roles.cache.get(role)
                    let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                    if(guildrole.position >= botrole.position){
                      return message.channel.send("Tôi không thể truy cập vai trò đó, hãy đặt \"tôi\" / \"vai trò cao nhất của tôi\" trên các vai trò khác mà bạn muốn tôi quản lý.\n\n Vui lòng thử thiết lập lại")
                    }
                    client.setups.push(message.guild.id, role, "welcome.roles")
                    return message.reply(`Đã thêm thành công Vai trò vào Thiết lập Chào mừng!`)
                  })
                })
              break;
              case "2":
              message.channel.send("Ping role của bạn ngay bây giờ!").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                  let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                  if(!role) return message.reply(`KHÔNG THỂ TÌM ĐƯỢC VAI TRÒ! Vui lòng thử thiết lập lại`)
                 try{
                  client.setups.remove(message.guild.id, role, "welcome.roles")
                  return message.reply(`Đã thêm thành công Vai trò vào Thiết lập Chào mừng!`)
                 }catch{
                  return message.reply(`Đã xảy ra lỗi!`)
                 }
                })
              })
              break;
              default:
              message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
              break;
            }
            }).catch(error=>{
              console.log(error)
              return message.reply("Hết thời gian rồi, xin lỗi nha!")
          })
        })
        break;
        case "3":
          let rrrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
    ${!client.setups.get(message.guild.id, "welcome.background.enabled") ?
    `**1.** \`Tắt nền\` - *Tắt nền*` :
    `**1.** \`Bật nền\` - *Bật nền*`}
**2.** \`Thay đổi nền\` - *Thay đổi nền*
**3.** \`Thay đổi màu đường viền\` - *Thay đổi màu của đường viền*
**4.** \`Thay đổi màu hộp tên người dùng\` - *Thay đổi màu của hộp tên người dùng*
**5.** \`Thay đổi màu hộp phân biệt\` - *Thay đổi màu của hộp phân biệt*
**6.** \`Thay đổi màu hộp thư\` - *Thay đổi màu của hộp thư*
**7.** \`Thay đổi màu tiêu đề\` - *Thay đổi màu sắc của tiêu đề*
**8.** \`Thay đổi màu hình đại diện\` - *Thay đổi màu sắc của hình đại diện*
**9.** \`Đặt lại hình ảnh\` - *Đặt lại Hình ảnh Chào mừng*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
            switch(collected.first().content.toString()){
              case "1":
                if(!client.setups.get(message.guild.id, "welcome.background.enabled")) {
                  client.setups.set(message.guild.id, true, "welcome.background.enabled");
                  message.reply("Đã bật thành công Thiết lập Nền-Chào mừng")
                }
                else if(client.setups.get(message.guild.id, "welcome.background.enabled")) {
                  client.setups.set(message.guild.id, false, "welcome.background.enabled");
                  message.reply("Vô hiệu hóa thành công Thiết lập Nền-Chào mừng")
                }
                else{
                  message.reply("Đã xảy ra sự cố")
                }
              break;

              case "2":
                message.reply("Nhập nền của bạn ngay bây giờ!").then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      case "1":
                       client.setups.set(message.guild.id, "null", "welcome.background.image")
                        break;
                      default:
                       if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){

                           message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo **không** xóa Hình ảnh của bạn khỏi Kênh!")
                           client.setups.set(message.guild.id, url, "welcome.background.image")
                         }
                         else{
                          message.reply("Không thể tin nhắn của bạn làm hình nền")
                      }
                       }
                       else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                         message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo **không** xóa Hình ảnh của bạn khỏi Kênh!")
                         client.setups.set(message.guild.id, collected.first().content, "welcome.background.image")
                       }
                       else{
                         message.reply("Không thể tin nhắn của bạn làm hình nền")
                       }

                        break;
                   }
                   function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("Hết thời gian rồi, xin lỗi nha!")
              })
               })
               break;

              case "3":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#`(e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.border");
                            message.reply("Đã thay đổi thành công màu đường viền")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;

              case "4":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.username-box");
                            message.reply("Đã thay đổi thành công màu hộp tên người dùng")
                            finise();
                          }
                          else{
                              message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "5":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.discriminator-box");
                            message.reply("Đã thay đổi thành công màu hộp phân biệt")
                            finise();
                          }
                          else{
                              message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "6":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.message-box");
                            message.reply("Đã thay đổi thành công màu hộp thư")
                            finise();
                          }
                          else{
                              message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "7":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.title");
                            message.reply("Đã thay đổi thành công màu tiêu đề")
                            finise();
                          }
                          else{
                              message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "8":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.avatar");
                            message.reply("Đã thay đổi thành công màu đại diện")
                            finise();
                          }
                          else{
                              message.reply("MÀU SAI! SỬ DỤNG`GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;

              case "9":
                client.setups.set(message.guild.id,  {
                      enable: true,
                      image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg",
                      colors: {
                        "border": config.colors.yes,
                        "username-box": config.colors.yes,
                        "discriminator-box": config.colors.yes,
                        "message-box": config.colors.yes,
                        "title": config.colors.yes,
                        "avatar": config.colors.yes
                    },
                }, "welcome.background")
                return message.reply("Đã đặt lại thành công Hình ảnh Rời khỏi!")
              break;
              default:
              message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
              break;
            }
         async function finise(){
         let avatar = message.author.displayAvatarURL({format: "png"});
         let username = message.author.username
         let hash = message.author.discriminator;
         let membercount = message.guild.memberCount;
         let Servername = message.guild.name;
         let bg = client.setups.get(message.guild.id, "welcome.background.image");

         let image = new Canvacord.Welcomer()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("border", client.setups.get(message.guild.id, "welcome.background.colors.border"))
            .setColor("username-box", client.setups.get(message.guild.id, "welcome.background.colors.username-box"))
            .setColor("discriminator-box", client.setups.get(message.guild.id, "welcome.background.colors.discriminator-box"))
            .setColor("message-box", client.setups.get(message.guild.id, "welcome.background.colors.message-box"))
            .setColor("title", client.setups.get(message.guild.id, "welcome.background.colors.title"))
            .setColor("avatar", client.setups.get(message.guild.id, "welcome.background.colors.avatar"))
            .setBackground(bg);

            let attachment = new MessageAttachment((await image.build()), "welcome-image.png");
            let embeds = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Chào mừng bạn đến với: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://welcome-image.png").setTimestamp()
          message.channel.send(embeds)
        }
          }).catch(error=>{
            console.log(error)
            return message.reply("Hết thời gian rồi, xin lỗi nha!")
        })
        })

        break;
        case "4":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            message: `Chúng tôi hy vọng rằng bạn thích nó ở đây!`,
            roles: [],
            background: {
                enable: true,
                image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg",
                colors: {
                  "border": config.colors.yes,
                  "username-box": config.colors.yes,
                  "discriminator-box": config.colors.yes,
                  "message-box": config.colors.yes,
                  "title": config.colors.yes,
                  "avatar": config.colors.yes
              },
            }
          }, "welcome")
          return message.reply("Thành công, đã đặt lại Thiết lập WELCOME")
          break;
        case "5":
            if(!client.setups.get(message.guild.id, "welcome.enabled")) {
              client.setups.set(message.guild.id, true, "welcome.enabled");
              message.reply("Đã kích hoạt thành công Thiết lập Chào mừng")
            }
            else if(client.setups.get(message.guild.id, "welcome.enabled")) {
              client.setups.set(message.guild.id, false, "welcome.enabled");
              message.reply("Vô hiệu hóa thành công Thiết lập Chào mừng")
            }
            else{
              message.reply("Something went wrong")
            }
          break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
  }
  function _leave(){

    let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**0.** \`Tạo thiết lập\` - *Tạo thiết lập kênh Rời khỏi!*
**1.** \`Quản lý tin nhắn\` - *Hãy để bạn chỉnh sửa Tin nhắn để lại*
**2.** \`Quản lý hình ảnh\` - *Hãy để bạn quản lý các cài đặt cho Hình nền*
**3.** \`Cài lại\` - *Đặt lại cài đặt cho Thiết lập Rời khỏi*
${!client.setups.get(message.guild.id, "leave.enabled") ?
`**4.** \`Bật tính năng leave\` - *Cho phép leave*` :
`**4.** \`Tắt tính năng leave\` - *Vô hiệu hóa Leave*`}
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          let bg = client.setups.get(message.guild.id, "leave.background.image")
          let image = new Canvacord.Leaver()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(message.guild.id, "leave.background.colors.border"))
              .setColor("username-box", client.setups.get(message.guild.id, "leave.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(message.guild.id, "leave.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(message.guild.id, "leave.background.colors.message-box"))
              .setColor("title", client.setups.get(message.guild.id, "leave.background.colors.title"))
              .setColor("avatar", client.setups.get(message.guild.id, "leave.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "Leave-image.png");


        message.guild.channels.create("👋Good Bye", {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ['READ_MESSAGE_HISTORY'],
              deny: ['SEND_MESSAGES'],
            },
          ],
        })
        .then((channel) => {

          let embed = new MessageEmbed()
          .setColor(config.colors.no)
          .setTitle("tạm biệt và hẹn gặp lại bạn:" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "leave.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://Leave-image.png").setTimestamp()
          channel.send(embed);
          client.setups.set(message.guild.id, true, "leave.enabled")
          client.setups.set(message.guild.id, channel.id, "leave.channel")
          return message.reply("<#"+channel.id+ "> | Thiết lập leave của bạn đã hoàn tất ngay bây giờ! Chạy lại cmd `< prefix >setup` để điều chỉnh Vai trò, Để lại Tin nhắn và Hình nền!")
        })
        break;
        case "1":
          message.channel.send("Nhập tin nhắn của bạn ngay bây giờ!").then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              client.setups.set(message.guild.id, collected.first().content, "leave.message")
              return message.reply("Đặt thành công thông báo Để lại tin nhắn!")
            }).catch(error=>{
              console.log(error)
              return message.reply("Hết thời gian rồi, xin lỗi nha!")
          })  
          }) 
        break; 
        case "2": 
          let rrrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
    ${!client.setups.get(message.guild.id, "leave.background.enabled") ?
    `**1.** \`Bật nền\` - *Bật nền*` :
    `**1.** \`Tắt nền\` - *Tắt nền*`}
**2.** \`Thay đổi nền\` - *Thay đổi nền*
**4.** \`Thay đổi màu đường viền\` - *Thay đổi màu của đường viền*
**3.** \`Thay đổi màu hộp tên người dùng\` - *Thay đổi màu của hộp tên người dùng*
**5.** \`Thay đổi màu hộp phân biệt\` - *Thay đổi màu của hộp phân biệt*
**6.** \`Thay đổi màu hộp thư\` - *Thay đổi màu của hộp thư*
**7.** \`Thay đổi màu tiêu đề\` - *Thay đổi màu sắc của tiêu đề*
**8.** \`Thay đổi màu hình đại diện\` - *Thay đổi màu sắc của hình đại diện*
**9.** \`Đặt lại hình ảnh\` - *Đặt lại hình ảnh*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
            switch(collected.first().content.toString()){
              case "1":
                if(!client.setups.get(message.guild.id, "leave.background.enabled")) {
                  client.setups.set(message.guild.id, true, "leave.background.enabled");
                  message.reply("Đã kích hoạt thành công Thiết lập Nền-Rời khỏi")
                }
                else if(client.setups.get(message.guild.id, "leave.background.enabled")) {
                  client.setups.set(message.guild.id, false, "leave.background.enabled");
                  message.reply("Vô hiệu hóa thành công Thiết lập Nền-Rời khỏi")
                }
                else{
                  message.reply("Đã xảy ra sự cố")
                }
              break;

              case "2":
                message.reply("Nhập nền của bạn ngay bây giờ!").then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      case "1":
                       client.setups.set(message.guild.id, "null", "leave.background.image")
                        break;
                      default:
                       if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){

                           message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo ** không ** xóa Hình ảnh của bạn khỏi Kênh!")
                           client.setups.set(message.guild.id, url, "leave.background.image")
                         }
                         else{
                          message.reply("Không thể tin nhắn của bạn làm hình nền")
                      }
                       }
                       else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                         message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo **không** xóa Hình ảnh của bạn khỏi Kênh!")
                         client.setups.set(message.guild.id, collected.first().content, "leave.background.image")
                       }
                       else{
                         message.reply("Không thể tin nhắn của bạn làm hình nền")
                       }

                        break;
                   }
                   function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("Hết thời gian!")
              })
               })
               break;

              case "3":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.border");
                            message.reply("Đã thay đổi thành công màu đường viền")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;

              case "4":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.username-box");
                            message.reply("Đã thay đổi thành công màu hộp tên người dùng")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "5":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.discriminator-box");
                            message.reply("Đã thay đổi thành công màu hộp phân biệt")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "6":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.message-box");
                            message.reply("Đã thay đổi thành công màu hộp thư")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "7":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.title");
                            message.reply("Đã thay đổi thành công màu tiêu đề")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;
              case "8":
                message.channel.send("Nhập màu của bạn ngay bây giờ!\n\nPhải là MÃ HEX dài 7 chữ cái, **với** dấu `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.avatar");
                            message.reply("Đã thay đổi thành công màu đại diện")
                            finise();
                          }
                          else{
                              message.reply("SAI MÀU! SỬ DỤNG `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                })
              break;

              case "9":
                client.setups.set(message.guild.id,  {
                      enable: true,
                      image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg",
                      colors: {
                        "border": config.colors.no,
                        "username-box": config.colors.no,
                        "discriminator-box": config.colors.no,
                        "message-box": config.colors.no,
                        "title": config.colors.no,
                        "avatar": config.colors.no
                    },
                }, "leave.background")
                return message.reply("Đã đặt lại thành công Hình ảnh Rời khỏi!")
              break;
              default:
              message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999)) 
              break;
            }
         async function finise(){
         let avatar = message.author.displayAvatarURL({format: "png"});
         let username = message.author.username
         let hash = message.author.discriminator;
         let membercount = message.guild.memberCount;
         let Servername = message.guild.name;
         let bg = client.setups.get(message.guild.id, "leave.background.image");

         let image = new Canvacord.Leaver()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("border", client.setups.get(message.guild.id, "leave.background.colors.border"))
            .setColor("username-box", client.setups.get(message.guild.id, "leave.background.colors.username-box"))
            .setColor("discriminator-box", client.setups.get(message.guild.id, "leave.background.colors.discriminator-box"))
            .setColor("message-box", client.setups.get(message.guild.id, "leave.background.colors.message-box"))
            .setColor("title", client.setups.get(message.guild.id, "leave.background.colors.title"))
            .setColor("avatar", client.setups.get(message.guild.id, "leave.background.colors.avatar"))
            .setBackground(bg);

            let attachment = new MessageAttachment((await image.build()), "Leave-image.png");
            let embeds = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Chào mừng bạn đến với: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://Leave-image.png").setTimestamp()
          message.channel.send(embeds)
        }
          }).catch(error=>{
            console.log(error)
            return message.reply("Hết thời gian rồi, xin lỗi nha!")
        })
        })

        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            message: `We hope that you enjoy it in here! :v: :heart:`,
            roles: [""],
            background: {
                enable: true,
                image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg",
                colors: {
                  "border": config.colors.yes,
                  "username-box": config.colors.yes,
                  "discriminator-box": config.colors.yes,
                  "message-box": config.colors.yes,
                  "title": config.colors.yes,
                  "avatar": config.colors.yes
              },
            }
          }, "leave")
          return message.reply("Thành công, đã đặt lại Thiết lập Rời khỏi")
          break;
        case "4":
            if(!client.setups.get(message.guild.id, "leave.enabled")) {
              client.setups.set(message.guild.id, true, "leave.enabled");
              message.reply("Đã kích hoạt thành công Thiết lập Rời khỏi")
            }
            else if(client.setups.get(message.guild.id, "leave.enabled")) {
              client.setups.set(message.guild.id, false, "leave.enabled");
              message.reply("Đã vô hiệu hóa thành công Thiết lập Rời khỏi")
            }
            else{
              message.reply("Something went wrong")
            }
          break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })

  }
}
/**
 * @JOINTOCREATE FINISHED
 */
function jointocreatesystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Tạo tham gia để tạo kênh\` - *Tạo một Kênh để Tham gia để Tạo (bạn có thể có nhiều hơn 1)*
${!client.setups.get(message.guild.id, "jointocreate.enabled") ?
`**2.** \`Cho phép tất cả Tham gia \` - *Cho phép tất cả Tham gia để Sáng tạo*` :
`**2.** \`Tắt tất cả Tham gia\` - *Tắt tất cả Tham gia để Tạo*`}
**3.** \`Đặt lại tất cả Tham gia để Tạo Cài đặt\` - *Đặt lại tất cả Tham gia để Tạo Cài đặt*

*Bạn không cần phải tắt Tham gia để Tạo, chỉ cần xóa Kênh nếu bạn không muốn nữa*
*Vô hiệu hóa Tham gia để tạo, có nghĩa là nó sẽ không tạo Kênh, khi ai đó tham gia nó*
`)
    .setFooter("Wibu Bot", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create(" Tạo-Phòng-Riêng", {
            type: 'category',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
              },
            ],
          })
          .then((channel) => {
             message.guild.channels.create(`Tạo Phòng Riêng`, {
              type: 'voice',
              parent: channel.id, //ADMINISTRATOR
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
            })
            .then((channel) => {
              //channel id in db
              client.setups.set(message.guild.id, true, "jointocreate.enabled");
              client.setups.push(message.guild.id, channel.id, "jointocreate.channels");
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Tham Gia Tạo Thiết Lập Của Bạn Đã Thành Công!")
                    .setDescription(`Bây giờ bạn có thể kết nối với: \`${channel.name}\`\n\nNếu bạn muốn một kênh khác, thì chỉ cần tạo một kênh khác.\nNếu bạn không muốn nữa, thì chỉ cần xóa kênh!`)
                    .setFooter("Wibu Bot", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
            })
          })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "jointocreate.enabled")) {
            client.setups.set(message.guild.id, true, "jointocreate.enabled");
            message.reply("Đã bật thành công tất cả Tham gia")
          }
          else if(client.setups.get(message.guild.id, "jointocreate.enabled")) {
            client.setups.set(message.guild.id, false, "jointocreate.enabled");
            message.reply("Đã vô hiệu hóa thành công tất cả Tham gia để tạo")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }

        break;
        case "3":
          client.setups.set(message.guild.id, {
              enabled: true,
              channels: [],
              tempchannels: [],
          }, "jointocreate");
          message.reply("Đã đặt lại thành công Tham gia để tạo thiết lập")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
}
/**
 * @LOGGER FINISHED
 */
function loggersystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Tạo trình ghi nhật ký\` - *Tạo MỘT Hệ thống ghi nhật ký*
${!client.setups.get(message.guild.id, "logger.enabled") ?
`**2.** \`Bật trình ghi nhật ký\` - *Bật Nhật ký cho Bang hội này*` :
`**2.** \`Tắt trình ghi nhật ký\` - *Tắt Trình ghi nhật ký*`}
**3.** \`Reset\` - *Đặt lại cài đặt cho Thiết lập trình ghi nhật ký*

*Bạn không cần phải tắt Trình ghi, chỉ cần xóa Kênh nếu bạn không muốn nữa*
*Vô hiệu hóa Trình ghi nhật ký, có nghĩa là tôi sẽ không còn Ghi nhật ký cho bạn nữa.*
`)
    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("VINH-LOGGER", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
          }, "logger");
            client.setups.set(message.guild.id, channel.id, "logger.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Thiết lập Trình ghi nhật ký của bạn đã được tạo thành công!")
                    .setDescription(`Bây giờ bạn có thể xem nhật ký: ${channel}\n\nNếu không muốn nữa thì cứ xóa kênh đi!`)
                    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)

              channel.send(`${message.author}, Tại đây bạn có thể xem Nhật ký của mình ngay bây giờ!`)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "logger.enabled")) {
            client.setups.set(message.guild.id, true, "logger.enabled");
            message.reply("Đã kích hoạt thành công Trình ghi nhật ký")
          }
          else if(client.setups.get(message.guild.id, "logger.enabled")) {
            client.setups.set(message.guild.id, false, "logger.enabled");
            message.reply("Đã vô hiệu hóa thành công Trình ghi nhật ký")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
        }, "logger");
        message.reply("Đã đặt lại thành công Thiết lập trình ghi nhật ký")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
}
/**
 * @AICHAT FINISHED
 */
function aichat(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Tạo Ai-Chat\` - *Tạo MỘT Ai-Chat*
${!client.setups.get(message.guild.id, "aichatsystem.enabled") ?
`**2.** \`Bật Ai-Chat\` - *Cho phép bạn trò chuyện với AI*` :
`**2.** \`Tắt Ai-Chat\` - *Tắt Trò chuyện AI*`}
**3.** \`Reset\` - *Đặt lại cài đặt cho Thiết lập Ai-Chat*

*Bạn không cần phải tắt Ai-Chat, chỉ cần xóa Kênh nếu bạn không muốn nữa*
*Tắt Ai-Chat có nghĩa là nó sẽ không trả lời tin nhắn của bạn*
`)
    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("AI-CHAT", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
          }, "aichatsystem");
            client.setups.set(message.guild.id, channel.id, "aichatsystem.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Thiết lập Ai-Chat của bạn đã được tạo thành công!")
                    .setDescription(`Bạn có thể trò chuyện với tôi trong: ${channel}\n\nNếu không muốn nữa thì cứ xóa kênh đi!`)
                    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              channel.send(`${message.author} Bây giờ bạn có thể Trò chuyện với tôi;)`)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "aichatsystem.enabled")) {
            client.setups.set(message.guild.id, true, "aichatsystem.enabled");
            message.reply("Đã bật Ai-Chat thành công")
          }
          else if(client.setups.get(message.guild.id, "aichatsystem.enabled")) {
            client.setups.set(message.guild.id, false, "aichatsystem.enabled");
            message.reply("Đã vô hiệu hóa thành công Ai-Chat")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
        }, "aichatsystem");
        message.reply("Đã đặt lại thành công Thiết lập Ai Chat")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\nĐầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
}
/**
 * @COUNTER FINISHED
 */
function counter(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`Tạo Counter-Chat\` - *Tạo MỘT cuộc trò chuyện*
${!client.setups.get(message.guild.id, "counter.enabled") ?
`**2.** \`Bật phản hồi trò chuyện\` - *Cho phép bạn trò chuyện với quầy*` :
`**2.** \`Tắt trò chuyện phản đối\` - *Tắt Trò chuyện Bộ đếm*`}
**3.** \`Lập lại truy cập\` - *Đặt lại Giá trị Đếm hiện tại thành 0*
**4.** \`Reset\` - *Đặt lại cài đặt cho Thiết lập Counter-Chat*

*Bạn không cần phải tắt Counter-Chat, chỉ cần xóa Kênh nếu bạn không muốn nữa*
*Tắt Counter-Chat, có nghĩa là nó sẽ không trả lời tin nhắn của bạn.*
`)
    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("Counter-CHAT", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
              number: 0,
              author: client.user.id
          }, "counter");
            client.setups.set(message.guild.id, channel.id, "counter.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Thiết lập trò chuyện tại quầy của bạn đã được tạo thành công!")
                    .setDescription(`Bây giờ bạn có thể đếm với tôi trong: ${channel}\n\nNếu không muốn nữa thì cứ xóa kênh đi!`)
                    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              channel.send(`${message.author} Bây giờ bạn có thể đếm với tôi;)`)
              channel.send("0")
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, true, "counter.enabled");
            message.reply("Đã bật Counter-Chat thành công")
          }
          else if(client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, false, "counter.enabled");
            message.reply("Đã tắt tính năng Counter-Chat thành công")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }
        break;
        case "3":
        client.setups.set(message.guild.id, 0, "counter.number");
        message.reply("Đã đặt lại thành công Giá trị bộ đếm")
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            number: 0,
            author: client.user.id
        }, "counter");
        message.reply("Đã đặt lại thành công Thiết lập trò chuyện tại bộ đếm")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\nĐầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
}
/**
 * @membercountsystem NOT FINISHED
 */
function membercountsystem(){

  let rembed = new MessageEmbed()      
    .setColor(config.colors.yes)
    .setTitle("Bạn muốn làm gì?")
    .setDescription(`
**1.** \`tạo Member-Counter\` - *Tạo MỘT Member-Counter*
${!client.setups.get(message.guild.id, "counter.enabled") ?
`**2.** \`mở Member-Counter\` - *Tiếp tục đếm thành viên của bạn!*` :
`**2.** \`tắt Member-Counter\` - *Tắt bộ đếm thành viên*`}
**3.** \`Chỉnh sửa tin nhắn\` - *Chỉnh sửa thông báo của MemberCount (Tên kênh)*
**4.** \`Reset\` - *Đặt lại cài đặt cho Thiết lập quầy thành viên*

*Bạn không cần phải tắt Bộ đếm thành viên, chỉ cần xóa Kênh nếu bạn không muốn nữa*
*Vô hiệu hóa Bộ đếm thành viên, có nghĩa là nó sẽ không trả lời tin nhắn của bạn*
`)
    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("🗣 Tất cả thành viên: " + message.guild.memberCount, {
            type: 'voice',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL'],
                  deny: ["CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: channel.id,
              tempnum: 5,
              message: "🗣 Tất cả thành viên: {member}"
          }, "membercount");
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Thiết lập Bộ đếm Thành viên của bạn đã được tạo thành công!")
                    .setDescription(`Bạn có thể chỉnh sửa tin nhắn bằng cách chạy lại \`<prefix>setup\`cmd\nTôi sẽ thay đổi số, cứ mỗi 10 Thành viên tham gia/Lá\n\nNếu bạn không muốn nữa, thì chỉ cần xóa kênh!`)
                    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, true, "counter.enabled");
            message.reply("Đã bật Counter-Chat thành công")
          }
          else if(client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, false, "counter.enabled");
            message.reply("Đã tắt tính năng Counter-Chat thành công")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }
        break;
        case "3":
          let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Enter the Channel Name!")
    .setDescription(`
    Đảm bảo rằng có một nơi nào đó {member}, đó là cách duy nhất để tôi có thể đếm được!

    Các ví dụ:
\`🗣 Tất cả thành viên: {member}\` --> \`🗣 Tất cả thành viên: ${message.guild.memberCount}\`
\`Các thành viên: {member}\` --> \`Các thành viên: ${message.guild.memberCount}\`
\`Mọi người: {member}\` --> \`Mọi người: ${message.guild.memberCount}\`
\`server-Thành viên: {member}\` --> \`server-Thành viên: ${message.guild.memberCount}\`
\`{member} User\` --> \`${message.guild.memberCount} User\`
`)
    .setFooter("Gửi tin nhắn!", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      let chname = collected.first().content.toString();
      if(!chname.substr(0, 32).includes("{member}")) {
        message.reply("HỦY, bạn đã không bao gồm `{member}`")
        return;
      }
      message.reply("Đã thay đổi thành công Tên kênh")

      client.setups.set(message.guild.id, chname.substr(0, 32), "membercount.message");
      let membercount  = client.setups.get(message.guild.id, "membercount");

      try{
        let channelid = membercount.channel;
        let channel = await client.channels.fetch(channelid);
        channel.setName(membercount.message.replace("{member}", message.guild.memberCount))
      }catch (e) {
        console.log(e);
      }
      }).catch(error=>{
        console.log(error)
        return message.reply("Hết thời gian rồi, xin lỗi nha!")
    })
    })
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: channel.id,
            tempnum: 0,
            message: "🗣  Tất cả thành viên: {member}"
        }, "membercount");
        message.reply("Đã đặt lại thành công Thiết lập trò chuyện tại quầy thành viên")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })
  })
}
/**
 * @TICKETSYSTEM NOT FINISHED
 */
function ticketsystem(){

    let ticket = client.setups.get(message.guild.id, "ticketsystem");

    let rembed = new MessageEmbed()
     .setColor(config.colors.yes)
     .setTitle("Bạn muốn làm gì?")
     .setDescription(`
  **1.** \`Tạo hệ thống vé ( Ticket ) \` - *Tạo MỘT Hệ thống vé ( Ticket ) cho Máy chủ của bạn*
  **2.** \`Chỉnh sửa tin nhắn\` - *Chỉnh sửa tin nhắn khi mở vé ( Ticket )*
  **3.** \`Thêm AdminRole\`- *Thêm vai trò cho quyền mua vé ( Ticket )*
  **4.** \`Xóa AdminRole\`- *Xóa bỏ vai trò đối với quyền mua vé ( Ticket )*
  ${!ticket.enabled ?
  `**5.** \`Bật hệ thống vé ( Ticket )\` - *Bật Ticket-Syste,*` :
  `**5.** \`Tắt hệ thống vé ( Ticket )\` - *Tắt hệ thống bán vé: không thể mở thêm vé ( Ticket )*`}
  **6.** \`Delete & Reset\` - *xóa thiết lập hiện tại, cho phép bạn thiết lập lại*
  `)
     .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
     .setThumbnail(config.AVATARURL)

     message.reply(rembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
          case "1":
            let msg6 = new MessageEmbed()
    .setTitle(`**Hey ${message.author.username}!**`)
    .setDescription(`Vui lòng nhập thông báo thiết lập vé ( ấn vào 🔓 để mở vé ( Ticket ) | luôn được cung cấp)`)
    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    .setColor(config.colors.yes)
    message.reply(msg6).then(msg => {
      msg.channel.awaitMessages(m => m.author.id == message.author.id,
          { max: 1, time: 180000, errors: ['time'], }).then(collected => {
            ticketmsg = collected.first().content;
            message.guild.channels.create("Support - Tickets", {
            type: 'category',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['READ_MESSAGE_HISTORY'],
                deny: ['SEND_MESSAGES'],
              },
            ],
          })
          .then((channel) => {
            //PARENT ID IN DB
            client.setups.set(message.guild.id, channel.id, "ticketsystem.parentid");
            //PARENT ID IN DB
            var lol = message.guild.channels
            .create("Tạo một vé ( Ticket )", {
              type: 'text',
              topic: "Nhấn vào emoji 🔓 để mở Vé ( Ticket )",
              parent: channel.id,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['READ_MESSAGE_HISTORY'],
                  deny: ['SEND_MESSAGES'],
                },
              ],
            })
            .then((channel) => {
              //channel id in db
              client.setups.set(message.guild.id, channel.id, "ticketsystem.channelid");
              //channel id in db
             channel.send(new MessageEmbed()
             .setTitle(`**Tạo một vé ( Ticket )**`)
             .setDescription(`${ticketmsg}\n\nNhấn vào emoji 🔓 để mở Vé ( Ticket )`)
             .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
             .setThumbnail(config.AVATARURL)
             .setColor(config.colors.yes)
             ).then(msg=>{
              //message id in db
              client.setups.set(message.guild.id, msg.id, "ticketsystem.messageid");
              client.setups.set(message.guild.id, true, "ticketsystem.enabled");
              msg.react("🔓")
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Thiết lập vé của bạn đã được tạo, bạn có thể chỉnh sửa mọi thứ bằng cách chạy lại `<prefix> setup`")
                    .setDescription(`<#${channel.id}>`)
                    .setFooter("Bot made Nguyễn Vinh", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              })
            })
          })
        }).catch(error=>{
          console.log(error)
          return message.reply("Hết thời gian rồi, xin lỗi nha!")
      })
      });
            break;
          case "6":
            try{
              let channel = message.guild.channels.cache.get(ticket.channelid)
              channel.delete();
            }catch{}
            try{
              let parent = message.guild.channels.cache.get(ticket.parentid)
              parent.delete();
            }catch{}
            message.reply("Đã đặt lại thành công Thiết lập vé hiện tại!")
            client.setups.set(message.guild.id, {
              enabled: true,
              guildid: message.guild.id,
              messageid: "",
              channelid: "",
              parentid: "",
              message: "Xin chào {user}, cảm ơn bạn đã mở một vé ( Ticket )! Sẽ có người giúp bạn sớm!",
              adminroles: []
            }, "ticketsystem");
          break;
          case "2":
           let rembed = new MessageEmbed()
           .setColor(config.colors.yes)
           .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
           .setThumbnail(config.AVATARURL)
     .setTitle("Nhập tin nhắn ngay bây giờ!")
     .setDescription(`{user} == người dùng mở vé ( Ticket )`)
            message.reply(rembed).then(msg => {
              msg.channel.awaitMessages(m=>m.author.id === message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                message.reply("Đã thay đổi thông báo thành công")
                client.setups.set(message.guild.id, collected.first().content, "ticketsystem.message");
              }).catch(error=>{
                console.log(error)
                return message.reply("Hết thời gian rồi, xin lỗi nha!")
            })
            })
          break;
          case "3":
            let rrembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
            .setThumbnail(config.AVATARURL)
            .setTitle("Ping một role bây giờ!")
            .setDescription(`Chỉ Ping role`)
                     message.reply(rrembed).then(msg => {
                       msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                         let role = collected.first().mentions.roles.first();
                         if(!role) message.reply("bạn đã không Ping một role hợp lệ")
                         console.log(role)
                         message.reply("Thêm thành công: `" + role.name + "` đến role Admin-Roles");
                         client.setups.push(message.guild.id, role.id, "ticketsystem.adminroles");
                         console.log(client.setups.get(message.guild.id, "ticketsystem"));
                       }).catch(error=>{
                        console.log(error)
                        return message.reply("XIN LỖI NHƯNG THỜI GIAN CỦA BẠN RAN HẾT")
                    })
                   })
          break;
          case "4":
            let rrrembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
            .setThumbnail(config.AVATARURL)
            .setTitle("Ping một role bây giờ! ")
            .setDescription(`Chỉ Ping role`)
                   message.reply(rrrembed).then(msg => {
                     msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                       let role = collected.first().mentions.roles.first();
                       if(!role) message.reply("bạn đã không Ping một role hợp lệ") /////////
                       console.log(role)
                       try{
                        client.setups.remove(message.guild.id, role.id, "ticketsystem.adminroles");
                        message.reply("**Đã xóa thành công**: `" + role.name + "` đến role Admin-Roles");
                       }catch{
                        message.reply("LỖI -> Đã đặt lại tất cả các role Quản trị viên")
                        client.setups.set(message.guild.id, [], "ticketsystem.adminroles");
                       }

                       console.log(client.setups.get(message.guild.id, "ticketsystem"));
                     }).catch(error=>{
                      console.log(error)
                      return message.reply("Hết thời gian rồi, xin lỗi nha!")
                  })
                   })
            break;
          case "5":
            if(!client.setups.get(message.guild.id, "ticketsystem.enabled")) {
              client.setups.set(message.guild.id, true, "ticketsystem.enabled");
              message.reply("Kích hoạt thành công Hệ thống bán vé ( Ticket )")
            }
            else if(client.setups.get(message.guild.id, "ticketsystem.enabled")) {
              client.setups.set(message.guild.id, false, "ticketsystem.enabled");
              message.reply("Vô hiệu hóa thành công Hệ thống bán vé ( Ticket )")
            }
            else{
              message.reply("Đã xảy ra sự cố")
            }
            break;
            default:
            message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
          break;
        }
      }).catch(error=>{
        console.log(error)
        return message.reply("Hết thời gian rồi, xin lỗi nha!")
    })
  })
}

/**
 * @RANKINGSYSTEM FINISHED 
 */
function rankingsystem(){
  let rembed = new MessageEmbed()
   .setColor(config.colors.yes)
   .setTitle("Bạn muốn làm gì?")
   .setDescription(`
${!client.setups.get(message.guild.id, "ranking.enabled") ?
`**1.** \`Bật Ranking\` - *Bật hệ thống ranking cho server này*` :
`**1.** \`Tắt Ranking\` - *Tắt hệ thống ranking cho server này*`}
**2.** \`Thay đổi nền\` - *Thay đổi nền của thẻ ranking*
**3.** \`Reset\` - *Đặt lại cài đặt cho Hệ thống ranking*
`)
   .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
   .setThumbnail(config.AVATARURL)

   message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          if(!client.setups.get(message.guild.id, "ranking.enabled")) {
            client.setups.set(message.guild.id, true, "ranking.enabled");
            message.reply("Đã kích hoạt thành công Hệ thống ranking")
          }
          else if(client.setups.get(message.guild.id, "ranking.enabled")) {
            client.setups.set(message.guild.id, false, "ranking.enabled");
            message.reply("Đã vô hiệu hóa thành công Hệ thống ranking")
          }
          else{
            message.reply("Đã xảy ra sự cố")
          }
        break;
        case "2":
          let rembed = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Bạn muốn làm gì?")
          .setDescription(`
       **1.** \`Vô hiệu hóa\` - *Gửi 1 để tắt nó*
       **2.** \`Nhập Url\` - *Chỉ cần gửi Url*
       `)
          .setFooter("Chọn INDEX NUMBER / gửi IMAGE URl", config.AVATARURL)
          .setThumbnail(config.AVATARURL)
          var url;

         message.reply(rembed).then(msg => {
           msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
             switch(collected.first().content.toString()){
               case "1":
                client.setups.set(message.guild.id, "null", "ranking.backgroundimage")
                 break;
               default:
                if (collected.first().attachments.size > 0) {
                  if (collected.first().attachments.every(attachIsImage)){

                    message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo **không** xóa Hình ảnh của bạn khỏi Kênh!")
                    client.setups.set(message.guild.id, url, "ranking.backgroundimage")
                  }
                  else{
                    message.reply("Không thể tin nhắn của bạn làm hình nền")
                }
                }
                else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                  message.reply("Thành công, hãy đặt Hình nền của bạn! Hãy đảm bảo **không** xóa Hình ảnh của bạn khỏi Kênh!") ////
                  client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage")
                }
                else{
                  message.reply("Không thể tin nhắn của bạn làm hình nền")
                }

                 break;
            }
            function attachIsImage(msgAttach) {
              url = msgAttach.url;

              //True if this url is a png image.
              return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
               url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
               url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
          }
          });
        })
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            backgroundimage: "null",
        }, "ranking");
        let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
              try{
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                const key = `${message.guild.id}-${rankuser.id}`;
                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0
              }catch{}
            }
        message.reply("Đã đặt lại thành công Hệ thống xếp hạng")
        break;
        default:
          message.reply(String("XIN LỖI, Số đó không tồn tại :(\n Đầu vào của bạn:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("Hết thời gian rồi, xin lỗi nha!")
  })

})
}

}
};
