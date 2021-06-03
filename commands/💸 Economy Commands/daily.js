const eco = require("discord-economy");
module.exports = {
    name: "daily",
    category: "💸 Economy Commands",
  description: "\`kiếm tiền hàng ngày của bạn\`",
  usage: "daily",
  run: async (client, message, args) => {
    
    var output = await eco.Daily(message.author.id)
    if (output.updated) {

     var profile = await eco.AddToBalance(message.author.id, 100)
     message.reply(`\`Bạn đã xác nhận số tiền hàng ngày của mình thành công! Bạn hiện sở hữu: ${profile.newbalance} tiền\``);

   } else {
     message.channel.send(`\`Xin lỗi, bạn đã xác nhận số tiền hàng ngày của mình!\Nhưng đừng lo, đã hết: ${output.timetowait} bạn có thể hàng ngày trở lại!\``)
   }
  }
  };
