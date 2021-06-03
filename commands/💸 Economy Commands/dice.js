const eco = require("discord-economy");
module.exports = {
    name: "dice",
    category: "💸 Economy Commands",
  description: "💵\`Cuộn xúc xắc\`",
  usage: "dice",
  run: async (client, message, args) => {
  //command

  var roll = args[0] //Should be a number between 1 and 6
  var amount = args[1] //Coins to gamble

  if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('\`Bạn phải ước luợng con số từ: | 1 | => | 6 |\`')
  if (!amount) return message.reply('💵\`Chỉ định | số tiền | bạn muốn chs súc sắc\`')

  var output = eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('💵\`Bạn có ít xu hơn số tiền bạn muốn chs súc sắc\`')

  var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
  message.reply(`🎲\`Xúc sắc lăn : ${gamble.dice} : Vì vậy, bạn : ${gamble.output} : Số tiền mới: ${gamble.newbalance} 💸\``)
  }
  };
