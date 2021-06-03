const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "sleeptimer",
    category: "⚙️ Utility Commands",
    aliases: ["sleep"],
    useage: "sleeptimer <Duration in Hours>",
  description: "\`Đặt hẹn giờ ngủ sẽ dừng bot/rời kênh và đuổi bạn ra khỏi kênh sau khoảng thời gian bạn đã đặt\`",
  run: async (client, message, args) => {
              
              if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
                let isdj=false;
                let leftb = "";
                    if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                        leftb = "❌ \`không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot\`"
                    else
                        for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                                if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                    if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                                leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                        }
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ \`Bạn không có quyền để sử dung lệnh, để sử dụng bạn cần phải có quyền: ${leftb}\``)
                }
                //CHECK IF DJ LOL
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice nào đó\`")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "❌ \`Bạn phải tham gia Kênh voice của tôi:\` " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
    let queue = client.distube.getQueue(message);
        if(!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")

    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Vui lòng thêm thời lượng \"sleep\" bạn muốn thêm, vui lòng tính theo giờ\`")
    functions.embedbuilder(client, "null", message, config.colors.no, "Sleeptimer set", `\`Tôi sẽ rời khỏi Kênh trong: ${args[0]}hours\``)
    setTimeout(()=>{
        functions.embedbuilder(client, "null", message, config.colors.no, "STOPPED!", `\`Đã rời kênh\``)
        let voicestate = message.member.voice;
        try{
            voicestate.setChannel(null)
            message.author.send(`Ngủ ngon, ${message.author} :zzz:`);
        }catch{}

        try {
            client.distube.stop(message);
        } catch {}

        try {
            voicestate.channel.leave();
        } catch {}

    }, Number(args[0]) * 1000 * 60 * 60)
  }
};
