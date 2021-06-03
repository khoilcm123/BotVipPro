const weather = require('weather-js');
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../config.json")

const path = require("path");
module.exports = {

  name: path.parse(__filename).name,
  category: "👻 Fun Commands",
  useage: `${path.parse(__filename).name} <C/F> <Location>`,
description: "*hình ảnh theo phong cách:* " + path.parse(__filename).name ,
  run: async (client, message, args) => {
    
    let degree;
     
      if(args[0]){
       
        if(args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f"){
            degree = args[0].toUpperCase();
        } else{
            return message.channel.send("\`Nhập loại bằng hợp lệ (C | F)\`");
        }
      } else{
        return message.channel.send(`\`Hãy thử định dạng sai: ${PREFIX}thời tiết <C / F><Location>\``);
      }

    
      if(!args[1]) return message.channel.send("\`Nhập một vị trí để tìm kiếm\`");

     
      weather.find({search: args[1], degreeType: degree}, function(err, result) {
        try{
        
          let embed = new MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setTitle(`Weather`)
            .setThumbnail(result[0].current.imageUrl)
            .setDescription(`Hiển thị dữ liệu thời tiết cho ${result[0].location.name}`)
            .addField("**Nhiệt độ:**", `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
            .addField("**Thời tiết:**", `${result[0].current.skytext}`, true)
            .addField("**ngày:**", `${result[0].current.shortday}`, true)
            .addField("**Cảm thấy như:**", `${result[0].current.feelslike}°${result[0].location.degreetype}`, true)
            .addField("**Độ ẩm:**", `${result[0].current.humidity}%`, true)
            .addField("**Gió:**", `${result[0].current.winddisplay}`, true)
            .setFooter(client.user.username, config.AVATARURL)

          message.channel.send(embed); 
        } catch(err){
          console.log(err); 

          return message.channel.send("\`Bạn có chắc nơi đó tồn tại không?\`"); 
        }
      });
  }
}