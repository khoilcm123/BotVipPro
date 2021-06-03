const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require("discord.js")
module.exports = function (client, options) {
    const description = {
        name: "chatbot",
        filename: "chatbot.js",
        version: "3.2"
    }
    let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Chủ sở hữu của bạn đã vô hiệu hóa HỆ THỐNG ỨNG DỤNG! Lấy làm tiếc")
    .setFooter("Nguyễn Vinh", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    console.log(` :: ⬜️ Module: ${description.name} | đã sẵn sàng ${description.version} từ ("${description.filename}")`.bold.green )

    client.on("messageReactionAdd", async (reaction, user) => {
      const { message } = reaction;
      if(user.bot || !message.guild) return;
      if(message.partial) await message.fetch();
      if(reaction.partial) await reaction.fetch();
      client.apply.ensure(message.guild.id, {
        "channel_id": "",
        "f_channel_id": "",
        "QUESTIONS": [{"1":"DEFAULT"}],
        "TEMP_ROLE": "",   
        "accept": "Bạn đã được chấp nhận!",
        "deny": "Bạn đã bị từ chối!"
       })
      if(message.channel.id === client.apply.get(message.guild.id, "channel_id") && reaction.emoji.name === "✅"){
          reaction.users.remove(user);
          let guild = await message.guild.fetch();
          let channel_tosend = guild.channels.cache.get(client.apply.get(message.guild.id, "f_channel_id"));
          if(!channel_tosend) return console.log("RETURN FROM !CHANNEL_TOSEND");
          let answers = [];
          let counter = 0;
          let Questions = client.apply.get(message.guild.id, "QUESTIONS");
          let act = Object.values(Questions[counter]).join(" ")
          ask_question(act);
  
          function ask_question(qu){
              if(counter === Questions.length) return send_finished();
              user.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("#fcfc03").setDescription(qu).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))).then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id === user.id, {max: 1, time: 60000, errors: ["time"]}).then(collected => {
                      answers.push(collected.first().content);
                      counter++;
                      if(counter === Questions.length) return send_finished();
                      let act = Object.values(Questions[counter]).join(" ")
                      ask_question(act);
                  }).catch(error=>{
                      console.log(error)
                      return message.channel.send(`${user}, XIN LỖI NHƯNG THỜI GIAN CỦA BẠN RAN HẾT!`).then(msg=> msg.delete({timeout: 3000}))
                  })
              }).catch(e => {
                reaction.message.channel.send(`${user}, LẤY LÀM TIẾC! Nhưng tôi không thể dm bạn:'(`).then(msg=> msg.delete({timeout: 3000}))
                
                console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});
          }
          async function send_finished(){
              let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("#fcfc03")
              .setTitle("Một ứng dụng mới từ: " + user.tag) 
              .setDescription(`${user}  |  \`${new Date()}\``)
              .setFooter(user.id, user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              for(let i = 0; i < Questions.length; i++){
                  try{
                      embed.addField(("**"+Object.keys(Questions[i])+". |** `" + Object.values(Questions[i]) + "`").substr(0, 256), String(answers[i]).substr(0, 1024))
                  }catch{
                  }
              }
              channel_tosend.send(embed).then(msg => {
                  msg.react("✅");
                  msg.react("❌");
                  client.apply.set(msg.id, user.id, "temp")
              }).catch(e => console.log("APPLY:".underline.red + " :: " + e.stack.toString().red));
              try{
                  let roleid = client.apply.get(message.guild.id, "TEMP_ROLE");
                  let member = message.guild.members.cache.get(user.id);
                  let role = await message.guild.roles.cache.get(roleid)
                  member.roles.add(role.id)
              }catch (e){
                  console.log(e)
              }
              user.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("#fcfc03").setTitle("Cảm ơn vì đã đăng ký: `" + message.guild.name + "`").setDescription(`${reaction.message.channel}`).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))).catch(e => console.log("APPLY:".underline.red + " :: " + e.stack.toString().red));
          }
          
  
      }
      if(message.channel.id === client.apply.get(message.guild.id, "f_channel_id") && (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")){
          //Entferne Alle Reactions vom BOT
          reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          
          const targetMessage = await message.channel.messages.fetch(message.id, false, true)
      if (!targetMessage) {
        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setTitle("Không thể nhận thông tin về Tin nhắn này!").setFooter(message.guild.name, message.guild.iconURL({dynamic:true})));
      }
      //altes embed
      const oldEmbed = targetMessage.embeds[0];
      if(!oldEmbed) return message.reply("KHÔNG HỢP LỆ, ĐƯỢC KẾT THÚC")
      const embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
            .setTitle(oldEmbed.title)
            .setDescription(`Sửa bởi: ${user} | ${reaction.emoji}`)
            if(oldEmbed.fields[0]){
              try{
                for(let i = 0; i<= oldEmbed.fields.length; i++){
                  try{
                    if(oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value)
                  }catch{}
                }
              }catch{}
            }
            if(oldEmbed.footer) embed.setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL)
                      
            if (reaction.emoji.name === "✅")  {
              embed.setColor("GREEN")
              targetMessage.edit(embed)
              let approve = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("GREEN")
              .setTitle("Bạn đã được chấp nhận từ: `" + message.guild.name + "`")
              .setFooter("Bởi  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              .setDescription(client.apply.get(message.guild.id, "accept"))
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(approve).catch(e => {message.channel.send("COULDN KHÔNG DM NGƯỜI NÀY!");console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});
            }
            if (reaction.emoji.name === "❌")  {
              embed.setColor("RED")
              targetMessage.edit(embed)
              let deny = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("RED")
              .setTitle("Bạn đã bị từ chối từ: `" + message.guild.name + "`")
              .setDescription(client.apply.get(message.guild.id, "deny"))
              .setFooter("Bởi  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(deny).catch(e => {message.channel.send("COULDN'T DM THIS PERSON!");console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});

            }
        
        targetMessage.edit(embed)
      }
  })
}