const Discord = require("discord.js");
const request = require("node-superfetch");
const search = require("youtube-search");

module.exports = {
    name: 'google',
    category: "⚙️ Utility Commands",
    aliases: ['gg'],
    description: "\`Tìm kiếm với Google\`",
    usage: 'a.google / a.gg [  Search query ]',
    run: async (client, message, args) => {
    let googleKey = "AIzaSyBudaKiBYYlyPanw9FrRy8Pac-TeO63m30";
    let csx = "2ce8f30da910f5680";
    let query = args.join(" ");
    let result;

    if (!query) return message.channel.send("\`Vui lòng nhập tên để tìm kiếm\` 🔎");

    href = await search(query);
    if (!href) return message.channel.send("❌ \`Chả thấy gì cả hahah\`");

    const embed = new Discord.MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
    .setURL(href.link)
    .setColor("RANDOM")
    .setFooter("Bot made in Nguyễn Vinh")

    return message.channel.send(embed);

    async function search(query) {
        const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: googleKey, cx: csx, safe: "off", q: query
        });

        if (!body.items) return null;
        return body.items[0];
    }
}}
