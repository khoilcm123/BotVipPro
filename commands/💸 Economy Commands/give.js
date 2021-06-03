const eco = require("discord-economy");
module.exports = {
    name: "give",
    category: "💸 Economy Commands",
  description: "\`Cho phép bạn chuyển tiền cho người dùng khác\`",
  usage: "give",
  run: async (client, message, args) => {
    var amount = args[1]
    let user = message.mentions.users.first();
    if (!user) return message.reply('\`Trả lời người dùng bạn muốn gửi tiền\`')
    if (!amount) return message.reply('\`Chỉ định số tiền bạn muốn thanh toán\`')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('\`Bạn có ít xu hơn số tiền bạn muốn chuyển!\`')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`\`Đã chuyển tiền thành công\Số dư từ: ${message.author.tag} : ${transfer.FromUser} 💸 Số dư từ: ${user.tag} : ${transfer.ToUser} 💸\``);
  }
  };
