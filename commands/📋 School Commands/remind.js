const utils = require('../../utils');

const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const ms = require("ms");
const { HORIZONTAL_ALIGN_CENTER } = require('jimp');
const config = require("../../config.json")
module.exports = {
  name: "remind",
  aliases: ["remind"],
  category: "📋 School Commands",
  description: "\`Nhắc nhở bạn vào một ngày cụ thể về điều gì đó\`",
  usage: "!remind <Ngày> + <Giờ> + <Phút> + <Giây> + <Nội dung>",
  run: async (client, message, args) => {
    let newargs = message.content.slice("p!remind".length).split("+")
    if(!args) return message.reply("USAGE: p!remind <Ngày> + <Giờ> + <Phút> + <Giây> + <NỘI DUNG>")
  //command
  let days = Number(newargs[0]) * 1000 * 60 * 60 * 24;
  let hour = Number(newargs[1]) * 1000 * 60 * 60;
  let mins = Number(newargs[2]) * 1000 * 60;
  let secs = Number(newargs[3]) * 1000;
  if(!days) days = 0;
  if(!hour) hour = 0;
  if(!mins) mins = 0;
  if(!secs) secs = 0;
  let content = newargs.slice(4).join(" ");
  if(!content) return message.reply("\`nội dung không được thêm vào\`")
  // Based off the delimiter, sets the time
  let returntime = days + hour + mins + secs;
  if(returntime>2073600000) return message.reply("\`Giới hạn là 24 ngày\`");
  if(returntime == 0) return message.reply("\`Vui lòng thêm thời gian\`");
  const now = new Date();

   const future = now.valueOf() + returntime;

  message.reply("Tôi sẽ nhắc bạn trong: " + `\`${newargs[0]} Ngày\`, \`${newargs[1]} Giờ\`, \`${newargs[2]} Phút\`, \`${newargs[3]} Giây\`   |   \`${new Date(future)}\` `)
  let olddate = Date();
      // Returns the Message
      client.setTimeout(function () {

        message.author.send(
          `
          Câu trả lời của bạn từ: <#${message.channel.id}>  **(${message.guild.name})**
          Từ :  \`${olddate}\`
             **MESSAGE:**
          `+
          content);
        
      }, returntime)
  }

};
