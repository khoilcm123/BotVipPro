const config = require("../../config.json")

const discord = require("discord.js");
const {
  Client,
  Collection,
  MessageEmbed,
  MessageAttachment
} = require(`discord.js`);
const officegen = require('officegen')
const fs = require('fs')
module.exports = {
  name: "close",
  category: "⛔️ Moderation Commands",
  aliases: ["delete"],
  description: "\`Đóng vé ( Ticket ), giống như với phản ứng chỉ qua cmd\`",
  useage: "close",
  run: async (client, message, args) => {
    let ticket = client.setups.get(message.guild.id, "ticketsystem")
    if(!ticket.enabled) return message.reply("Vé ( Ticket ) chưa được thiết lập!")
    if (message.channel.parent.id === ticket.parentid) {

      if (!message.member.roles.cache.some(r => ticket.adminroles.includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Bạn không được phép đóng Vé ( Ticket ) này!").catch(error => console.log(error));

      if (!message.channel.topic.includes("ticket")) return console.log("KHÔNG PHẢI LÀ VÉ ( Ticket )");
      let userid = message.channel.topic.slice("ticket-".length);
      try {
        let member = message.guild.members.cache.get(userid);
        member.send(`\`Vé ( Ticket ) của bạn đã được chốt bởi: ${message.author.tag}! Đây là một bản ghi:\``).catch(error => console.log(error));

      } catch (error) {

      }
      let errortranscript = false;
        await create_transcript(message, client, 500)
        await delay(2000);
        try { 
          const buffer = fs.readFileSync(`./transcript.docx`); 
          const attachment = new MessageAttachment(buffer, `./transcript.docx`);
          let sendembed = new MessageEmbed()
          .setTitle(`Đăng nhập kênh vé ( Ticket ): \`#${message.channel.name}\``)
          .setColor(config.colors.yes)
          .setFooter("Bot made in Nguyễn Vinh", config.AVATARURL)
          .setThumbnail(config.AVATARURL)
         try{
          let user = message.guild.members.cache.get(userid)
          sendembed.setDescription(`${user.user}\n**\`${user.user.username}#${user.user.discriminator}\`**\n**\`(${user.user.id})\`**`)
          sendembed.setThumbnail(user.user.displayAvatarURL({dynamic:true}))
          try{
              user.send(sendembed)
              user.send(attachment)      
          } catch{

          }
         } catch{
          sendembed.setDescription(message.channel.topic)
         }
          message.author.send(sendembed)
          message.author.send(attachment) 

          let embed = new discord.MessageEmbed()
          .setColor(config.colors.yes)
          .setFooter("Wibu Bot", config.AVATARURL)
          .setThumbnail(config.AVATARURL)
          .setTitle("Đã tạo và gửi bản ghi!")
          .setDescription(`✅ Vé ( Ticket ) sẽ bị xóa sau 5 giây!`)
          message.reply(embed) 
          fs.unlinkSync(`./transcript.docx`)
        } catch (error){ 
         console.log(error)
          message.reply(new MessageEmbed().setAuthor("LỖI! Bản ghi phải lớn, để được gửi vào Kênh!", message.member.user.displayAvatarURL({ dynamic: true })).setFooter("Nhỏ hơn số lượng Tin nhắn tối đa!"))
         fs.unlinkSync(`./transcript.docx`)
         errortranscript = true;
        }

        if(errortranscript) { 
          message.channel.overwritePermissions([
            { id: message.guild.roles.everyone, deny: ['VIEW_CHANNEL'],  },
          ]);
          message.channel.setName("CLOSED!");
          message.channel.setTopic("VÌ BẢNG ĐIỂM QUÁ LỚN")
          return;
        }
        await delay(5000)
      message.channel.delete().catch(error => console.log(error));
    }
  }
}
async function create_transcript(message, client, msglimit){
 await message.reply(new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1"))
  let docx = officegen({
    type: 'docx',
    author: client.user.username,
    creator: client.user.username,
    description: `Bản ghi cho Kênh #${message.channel.name} với ID: ${message.channel.id}`,
    pageMargins: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
    title: `Transcript!`

  })
  
  docx.on('finalize', function (written) {
    console.log('\`Hoàn tất để tạo tài liệu Microsoft Word\`')
  })
  docx.on('error', function (err) {
    console.log(err);
    return;
  })
  await message.react("📑"); 
  
  pObj = docx.createP()
  pObj.options.align = 'left'; 
  pObj.options.indentLeft = -350;  
  pObj.options.indentFirstLine = -250;  
  pObj.addText('Bản ghi cho:   #' + message.channel.name, { font_face: 'Arial', color: '3c5c63', bold: true, font_size: 22 }); 
  pObj.addLineBreak() 
  pObj.addText("Channelid: " + message.channel.id, { font_face: 'Arial', color: '000000', bold: false, font_size: 10 });
  pObj.addLineBreak() 
  pObj.addText(`Tin nhắn cũ nhất ở BOTTOM `, { hyperlink: 'myBookmark', font_face: 'Arial', color: '5dbcd2', italic: true, font_size: 8 });  
  pObj.addText(`  [BẤM VÀO ĐÂY ĐỂ JUMP]`, { hyperlink: 'myBookmark', font_face: 'Arial', color: '1979a9', italic: false, bold: true, font_size: 8 });  
  pObj.addLineBreak() 
  
  let messageCollection = new discord.Collection(); 
  let channelMessages = await message.channel.messages.fetch({
    limit: 100
  }).catch(err => console.log(err)); 
  messageCollection = messageCollection.concat(channelMessages); 
  let tomanymsgs = 1; 
  if (Number(msglimit) === 0) msglimit = 100; 
  let messagelimit = Number(msglimit) / 100; 
  if (messagelimit < 1) messagelimit = 1;
  while (channelMessages.size === 100) { 
    if (tomanymsgs === messagelimit) break; 
    tomanymsgs += 1; 
    let lastMessageId = channelMessages.lastKey();
    channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
    if (channelMessages) 
      messageCollection = messageCollection.concat(channelMessages); 
  }
  let msgs = messageCollection.array().reverse();
  
  await msgs.forEach(async msg => {
    
    pObj = docx.createP()
    pObj.options.align = 'left'; 
   
    pObj.addText(`${msg.author.tag}`, { font_face: 'Arial', color: '3c5c63', bold: true, font_size: 14 });
    pObj.addText(`  ❤️  ${msg.createdAt.toDateString()}  ❤️  ${msg.createdAt.toLocaleTimeString()}`, { font_face: 'Arial', color: '3c5c63', bold: true, font_size: 14 }); //
    
    pObj.addLineBreak()
       
    let umsg;

    if (msg.content.startsWith("```")) {
      umsg = msg.content.replace(/```/g, "");
    }
    else if (msg.attachments.size > 0) {
      umsg = "Không thể chuyển biên (Nhúng / Video / Âm thanh / v.v)";
    }
    else {
      umsg = msg.content;
    }
    pObj.addText(umsg, { font_face: 'Arial', color: '000000', bold: false, font_size: 10 });
   
    pObj.addLineBreak()
    pObj.addText(`______________________________________________________________________________________________________________________________________________________________________________________________________________`, { color: 'a6a6a6', font_size: 4 });

  });
 
  pObj.startBookmark('myBookmark');  
  pObj.endBookmark();
  let out = fs.createWriteStream('transcript.docx') 
  out.on('error', function (err) {
    console.log(err)
  })
  out.on("finish", async function (err, result) {
    await delay(3000);
    return;
  })
  return docx.generate(out)

}
function delay(delayInms) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve(2);
      }, delayInms);
  });
}
