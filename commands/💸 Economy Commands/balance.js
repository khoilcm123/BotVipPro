const eco = require("discord-economy");
module.exports = {
    name: "balance",
    category: "💸 Economy Commands",
  description: "\`Cho phép bạn kiểm tra xem bạn có bao nhiêu tiền\`",
  usage: "balance [@USER]",
  run: async (client, message, args) => {
  //command
  let user = message.mentions.users.first();
  if(!user) message.author;

  var output = await eco.FetchBalance(user.id)
  message.reply(`${user} \`sở hữu ${output.balance} 💸\`.`);
  }
  };
