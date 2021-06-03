module.exports = {
  name: "random",
  aliases: ["randomnum"],
  category: "📋 School Commands",
  description: "\`Hiển thị một số ngẫu nhiên\`",
  usage: "random <MIN. NUM> <MAX. NUM>",
  run: async (client, message, args) => {
  //command
  let min = args[0];
  if(!min) return message.reply("Vui lòng bao gồm một số lượng tối thiểu! Sử dụng: `//random <MIN. NUM> <MAX. NUM>`")
  let max = args[1];
  if(!max) return message.reply("Vui lòng bao gồm một số lượng tối đa! Sử dụng: `//random <MIN. NUM> <MAX. NUM>`")
  if(isNaN(min) || isNaN(max))return message.reply("Các tham số PHẢI là số! Sử dụng: `//random <MIN. NUM> <MAX. NUM>`")
  message.channel.send(`\`\`\`fix\n${getRandomInt(Number(min), Number(max))}\n\`\`\``)  
  }
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
