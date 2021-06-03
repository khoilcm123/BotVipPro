const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "djs",
  aliases: ["docs"],
  description: "\`Gởi văn bản docs cho ae học làm code\`",
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("\`Vui lòng chỉ định một truy vấn\`");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  },
};
