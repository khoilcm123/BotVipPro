const Discord = require("discord.js");
const malScraper = require('mal-scraper');
const config = require("../../config.json")
module.exports = {
    name: "anime",
    category: "⚙️ Utility Commands",
    description: "\`Nhận thông tin về anime\`",
    usage: "animesearch <Anime>",
    run: async (client, message, args) => {

         const search = `${args}`;
         if(!search)
         return message.reply(' Vui lòng thêm tên để tìm kiếm nếu lệnh không hợp lệ sẽ không hoạt động ');

        malScraper.getInfoFromName(search)
           .then((data) => {
           const malEmbed = new Discord.MessageEmbed()
                .setAuthor(`Kết quả tìm kiếm Danh sách Anime của tôi cho: ${args}`.split(',').join(' '))
                .setThumbnail(data.picture).setFooter(client.user.username, config.AVATARURL)
                .setColor(config.colors.yes) 
                .addField('Tiêu đề tiếng Anh:', data.englishTitle, true)
                .addField('Tiêu đề tiếng Nhật:', data.japaneseTitle, true)
                .addField('Kiểu:', data.type, true)
                .addField('Các tập:', data.episodes, true)
                .addField('Xếp hạng:', data.rating, true)
                .addField('Phát sóng:', data.aired, true)
                .addField('Ghi bàn:', data.score, true)
                .addField('Số liệu thống kê:', data.scoreStats, true)
                .addField('Đường link:', data.url);

           message.channel.send(malEmbed);

           })
      }
};
