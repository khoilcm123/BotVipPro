const randomPuppy = require('random-puppy');
const request = require('node-fetch');
const fs = require("fs")
const config = require("../../config.json")
const Discord = require('discord.js');
const booru = require('booru');

module.exports = {
    name: "danbooru",
    category: "🔞 NSFW Commands",
    usage: "danbooru",
  description: "\`Tìm kiếm bảng hình ảnh danbooru\`",
  run: async (bot, message, args, level) => {
 
  //Checks channel for nsfw
  var errMessage = "\`Đây không phải là Kênh NSFW\`";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('\`Loại công cụ đó không được phép! Thậm chí không có trong các kênh NSFW\`');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('db', [query], {random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("Danbooru:")
              .setImage(image.common.file_url)
              .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
              .setFooter(`Tags: danbooru ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`\`Không tìm thấy kết quả nào cho:\` **${query}**!`);
          } else {
              return message.channel.send(`\`Không tìm thấy kết quả nào cho\` **${query}**!`);
          }
})
  }
  };
