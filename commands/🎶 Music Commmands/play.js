const functions = require("../../functions")
const config = require("../../config.json")
var { getData, getPreview } = require("spotify-url-info");
const ytsr = require("youtube-sr")
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
module.exports = {
    name: "play",
    category: "🎶 Music Commmands",
    aliases: ["p"],
    cooldown: 5,
    useage: "play <URL/NAME>",
  description: "\`Phát một bài hát, từ youtube, soundcloud hoặc bất cứ thứ gì, hoặc tìm kiếm bài hát đó hoặc phát một danh sách phát\`",
  run: async (client, message, args) => {
             //CHECK IF DJ LOL
             if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
              let isdj=false;
              let leftb = "";
                  if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                      leftb = "\`không có Kênh, hay còn gọi là tất cả các Kênh đều là Kênh Bot\`"
                  else
                      for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                              if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                  if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                              leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                      }
                  if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `Bạn không có quyền cho Lệnh này! Bạn cần phải có: ${leftb}`)
              }
              //CHECK IF DJ LOL
      if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Bạn cần phải vào một channel voice nào đó")
      if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "\`Vui lòng thêm một cái gì đó mà bạn muốn tìm kiếm\`")
      if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "  Bạn phải tham gia Kênh voice của tôi: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
      functions.embedbuilder(client, 5000, message, config.colors.yes, "🧐 \`Đang tìm kiếm\`", "```" + args.join(" ") + "```")
      if(args.join(" ").includes("deezer")){
        //Get album list for the given artist id
        let track = args.join(" ").split("/")

        track = track[track.length-1]
        deezer.playlist.tracks(track).then(async function(result) {
          let items = result.data;
          let songsarray = [];
          let tracklength = items.length;
         /* if(tracklength > 25) 
          {
              message.reply("\`tối đa các bản nhạc hiện tại cho danh sách phát deezer là 25 bản nhạc, nếu bạn muốn sử dụng danh sách phát lớn hơn, mình sẽ sử dụng 25 bài hát đầu tiên!\`"); 
              tracklength = 25;
          } */
          functions.embedbuilder(client, 5000, message, config.colors.yes, "<:youtube:769675858431705109> Tìm nạp các bài hát!", "Điều này sẽ đưa tôi đi khắp nơi: " + tracklength/2 + " giây");
          for(let i = 0; i < items.length; i++){
              let songInfo = await ytsr.searchOne(items[i].title) ;
              songsarray.push(songInfo.url)
          }
          console.log(songsarray)
          client.distube.playCustomPlaylist(message, songsarray, { name: message.author.username + "'s Deezer Playlist" });
        });
      }
      else if(args.join(" ").includes("track") && args.join(" ").includes("open.spotify")){
        let info = await getPreview(args.join(" "));
        return client.distube.play(message, info.artist + " " + info.title);
      }
      else  if(args.join(" ").includes("playlist") && args.join(" ").includes("open.spotify")){
        let info = await getData(args.join(" "));
        let items = info.tracks.items;
        let songsarray = [];
        let tracklength = items.length;
        if(tracklength > 25) 
        {
            message.reply("❌\`tối đa các bản nhạc hiện tại cho danh sách phát deezer là 25 bản nhạc, nếu bạn muốn sử dụng danh sách phát lớn hơn, thì mình sẽ sử dụng 25 bài hát đầu tiên!\`"); 
            tracklength = 25;
        }
        functions.embedbuilder(client, 5000, message, config.colors.yes, "Tìm nạp các bài hát!", "Điều này sẽ đưa tôi đi khắp nơi: " + tracklength/2 + " giây");
        for(let i = 0; i < items.length; i++){
            let songInfo = await ytsr.searchOne(items[i].track.name) ;
            songsarray.push(songInfo.url)
        }
        client.distube.playCustomPlaylist(message, songsarray, { name: message.author.username + "'s Spotify Playlist" });
      }
      else{
        return client.distube.play(message, args.join(" "));
      }
    }
  };

// Vinh đẹp trai bố đời thế
