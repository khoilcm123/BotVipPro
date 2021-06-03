const { tictactoe } = require('reconlx');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "x-o",
    aliases: ["x--o"],
    category: "🎮 Game commands",
    description: "\`Chơi game\` ❌ ⭕ \`cùng với thanh niên bố đời nào đó\`",
    usage:"!x-o @tag tên người muốn chơi cùng",

    run: async (client, message, args) => {
        
        const user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!user) 
        return message.reply(`\`Vui lòng đề cập đến một người dùng để chơi cùng !x-o [User]\``)

        new tictactoe({
            player_two: user,
            message: message
        })
    }
}
