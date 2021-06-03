const eco = require("discord-economy");

module.exports = {  
    name: "slots",
    category: "💸 Economy Commands",
  description: "\`cho phép bạn chơi máy đánh bạc\`",
  usage: "slots",
  run: async (client, message, args) => {
  //command
  var amount = args[0] //Coins to gamble
 
  if (!amount) return message.reply('\`Chỉ định số tiền bạn muốn đánh bạc\`')

  var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('\`Bạn có ít xu hơn số tiền bạn muốn đánh bạc\`')

  var gamble = await eco.Slots(message.author.id, amount, {
    width: 3,
    height: 1
  }).catch(console.error)
  message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
  message.reply(`\`Bạn ${gamble.output}! Số tiền mới: ${gamble.newbalance}\``)

  }
  };
