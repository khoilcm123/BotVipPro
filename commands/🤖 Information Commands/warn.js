const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "txt",
  usage: "warn <@mention> <reason>",
  description: "\`Cảnh báo bất kỳ ai không tuân theo các quy tắc\`",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATORS")) {
      return message.channel.send("Bạn nên có quyền quản lí để xài nha!")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Vui lòng đề cập đến người mà bạn muốn cảnh báo - < prefix > @mention [ lý do ] \`")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Ơ đây là bot mà")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("Bạn không thể cảnh báo chính mình!")
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send("Người ta là chủ server đó bạn!")
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send("❌\`Vui lòng cung cấp lý do để cảnh báo - warn @mention < lý do >\`")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} đã đạt đến giới hạn của anh ấy / cô ấy với 3 cảnh báo`)
    }
    
    if(warnings === null) {
      db.set(`Cảnh báo_${message.guild.id}_${user.id}`, 1)
      user.send(`Bạn đã được cảnh báo trong: **${message.guild.name}** cho ${reason}`)
      await message.channel.send(`Bạn đã cảnh báo: **${message.mentions.users.first().username}** cho ${reason}`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`Bạn đã được cảnh báo trong: **${message.guild.name}** cho ${reason}`)
      await message.channel.send(`Bạn đã cảnh báo: **${message.mentions.users.first().username}** cho ${reason}`)
    }
    
  
  } 
}
