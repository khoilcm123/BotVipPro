const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
  name: "serverinfo2",
  category: "⚙️ Utility Commands",
description: "\`Hiển thị thông tin về máy chủ\`",
usage: "serverinfo2",
run: async (client, message, args) => {

//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("Thông tin về DISCORD")
.setColor(config.colors.yes)

.addField("TÊN DISCORD", "\`"+message.guild.name+"\`")
.addField("NGƯỜI TẠO DISCORD",  "\`"+`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}+"\`"`, true)
.addField("Channels",  "\`"+message.guild.channels.cache.size+"\`", true)
.addField("Rolles",  "\`"+message.guild.roles.cache.size+"\`", true)
.addField("Được tạo ra",  "\`"+message.guild.createdAt+"\`")
.addField("Bạn đã tham gia",  "\`"+message.member.joinedAt+"\`")
.addField("Tổng số thành viên",  "\`"+message.guild.memberCount+"\`")
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setTimestamp()
.setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
message.channel.send(serverembed);
}
};
