const utils = require('../../utils');

const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const config = require("../../config.json")
module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "📋 School Commands",
  description: "💻 Tính toán một phương trình toán học!",
  usage: "[command | input]",
  run: async (client, message, args) => {
  //command
  
  if(args.length < 1)
  return message.reply(`Bạn phải cung cấp một phương trình để giải trên máy tính!`);

const question = args.join(' ');

let answer;
if(question.indexOf('9 + 10') > -1) {
  answer = '21';
} else {
  try {
      answer = math.eval(question);
  } catch (err) {
      message.channel.send(`\`Phương trình toán học không hợp lệ: ${err}\``);
  }
}

message.channel.send({
  embed: utils.embed('', stripIndents`
  **phép tính:**\n\`\`\`\n${question}\n\`\`\`
  **kết quả:**\n\`\`\`\n${answer}\n\`\`\`
  `)
});
  }
  };
