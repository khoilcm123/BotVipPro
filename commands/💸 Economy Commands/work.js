const eco = require("discord-economy");
module.exports = {
    name: "work",
    category: "💸 Economy Commands",
  description: "\`Cho phép bạn làm việc\`",
  usage: "work",
  run: async (client, message, args) => {

  var output = await eco.Work(message.author.id)
  //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
  if (output.earned == 0) return message.reply('\`Ồ, bạn đã không làm tốt công việc của mình nên chẳng kiếm được gì cả!\`')
  message.channel.send(`${message.author.username}
\`Bạn đã làm việc như một: ${output.job} và kiếm được: ${output.earned} 💸 | Bạn hiện sở hữu ${output.balance} 💸\``)
  }
  };
