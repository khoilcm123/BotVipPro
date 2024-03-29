const config = require('../../config.json');

module.exports = {
    name: "clear",
    aliases: ["purge", "nuke", "clean"],
    category: "fun",
    description: "Xoá tin nhắn theo yêu cầu!",
    usage:"!clear ( số tìn nhắn muốn xoá )",
    
    run: async (client, message, args) => {

        const perms = ["MANAGE_MESSAGES" || "ADMINSTRATOR"]

        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission(perms)) {
            return message.reply("Bạn làm gì có quyền mà đòi xoá tin nhắn của người ta!")
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (!message.guild.me.hasPermission(perms)) {
            return message.reply(`Mình không có quyền xoá tin nhắn vui lòng cấp quyền cho mình!`)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply(`Vui lòng cung cấp số từ 1 => 100 để mình còn biết mà xoá nha!`)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (parseInt(args[0]) > 100) 
        return message.reply('Mình chỉ có thể xoá tôi thiểu 100 tin nhắn cùng 1 lúc thôi !')
        .then(msg => {
            msg.delete({ timeout: 15000 })
        })

        let deleteAmount = parseInt(args[0]);  

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Tin nhắn đã bay`))
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })
            
    }
}
