const { MessageEmbed } = require("discord.js");
const api = require('novelcovid');
api.settings({ baseUrl: 'https://disease.sh' });
const { laysodep, capitalizeWords } = require('../../modules/utils');
module.exports = {
    name: "corona",
    aliases:['covid', 'cv', 'cd'],
    category: "👻 Fun Commands",
    description: "\`Xem tình hình các ca nhiễm bệnh trong cộng đồng trong nước và quốc tế\`",
    usage:".covid < tên nước bạn muốn xem vd: .covid việt nam >",
    run: async(client, message, args) => {
        if (!args[0]) {
            const data = await api.all();
            const { updated, cases, todayCases, deaths, todayDeaths, critical, recovered, affectedCountries } = data;
            const d = new Date(updated);
            const fulldate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            const embed = new MessageEmbed()
                .setAuthor('Dữ liệu tự động cập nhật')
                .setTitle(`Số ca nhiễm COVID-19 ở Thế Giới`)
                .addField('Số ca nhiễm: ', `${laysodep(cases)}(+${laysodep(todayCases)})`, true)
                .addField('Số ca tử vong: ', `${laysodep(deaths)}(+${laysodep(todayDeaths)})`, true)
                .addField('Số ca nghiêm trọng: ', laysodep(critical), true)
                .addField('Số ca hồi phục: ', laysodep(recovered), true)
                .addField('Số quốc gia bị nhiễm: ', affectedCountries, true)
                .addField('Ngày cập nhật: ', fulldate, true)
                .setFooter('Nguồn: worldometers.info');
            message.channel.send(embed);
        } else if (args[0] == 'usstate') {
            if (!args[1]) return message.channel.send('Vui lòng nhập tên bang!');
            const statename = args.splice(1).join(' ');
            const data = await api.states({ state: statename });
            const { state, cases, todayCases, deaths, todayDeaths, tests, active } = data;
            if (data.message) return message.channel.send('Không tìm thấy bang mà bạn yêu cầu');
            const embed = new MessageEmbed()
                .setAuthor(`Thông tin về COVID-19 ở bang ${state}`)
                .addField('Tất cả ca nhiễm: ', `${laysodep(cases)}(+${laysodep(todayCases)})`, true)
                .addField('Số ca tử vong: ', `${laysodep(deaths)}(+${laysodep(todayDeaths)})`, true)
                .addField('Số ca đã thử virus: ', laysodep(tests), true)
                .addField('Số ca nhiễm hiện tại: ', laysodep(active), true)
                .setFooter('Nguồn: worldometers.info');
            message.channel.send(embed);
        } else if (args[0] == 'usprovince') {
            if (!args[1]) return message.channel.send('Vui lòng nhập tên quận!');
            const query = args.splice(1).join(' ');
            if (!query.includes(',')) return message.channel.send('Vui lòng nhập tên bang cách tên quận bằng dấu phẩy(,)! (VD: Dallas,tx)');
            const arr_query = query.split(',');
            if (!arr_query[1]) return message.channel.send("Vui lòng nhập tên bang hoặc mã bang!");
            const province_name = arr_query[0].toLowerCase();
            let state = arr_query[1];
            if (state.length == 2) {
                state = state.trim().toUpperCase();
                let dataf = usaState.filter(e => e.abbreviation == state);
                dataf = dataf[0];
                state = dataf.name;
            }
            state = capitalizeWords(state.trim());
            let data = await api.jhucsse.counties({ county: province_name });
            data = data.filter(e => e.province == state);
            const { county, province, stats, updatedAt } = data[0];
            const { confirmed, deaths, recovered } = stats;
            const d = new Date(updatedAt);
            const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            const embed = new MessageEmbed()
                .setAuthor(`Thông tin về COVID-19 ở quận ${county},${province}`)
                .addField('Số ca nhiễm: ', laysodep(confirmed), true)
                .addField('Số ca tử vong: ', laysodep(deaths), true)
                .addField('Số ca hồi phục: ', laysodep(recovered), true)
                .addField('Ngày cập nhật: ', date, true)
                .setFooter('Source: John Hopkins University');
            message.channel.send(embed);
        } else {
            const data = await api.countries({ country: args.join(' ') });
            const { updated, country, countryInfo, cases, todayCases, deaths, todayDeaths, critical, recovered } = data;
            if (data.message) return message.channel.send('Mình không tìm thấy tên nước mà bạn nhập.');
            const d = new Date(updated);
            const fulldate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            const embed = new MessageEmbed()
                .setAuthor(`Thông tin về COVID-19 ở ${country}`)
                .setThumbnail(countryInfo.flag)
                .addField('Số ca nhiễm: ', `${laysodep(cases)}(+${laysodep(todayCases)})`, true)
                .addField('Số ca tử vong: ', `${laysodep(deaths)}(+${laysodep(todayDeaths)})`, true)
                .addField('Số ca nghiêm trọng: ', laysodep(critical), true)
                .addField('Số ca hồi phục: ', laysodep(recovered), true)
                .addField('Ngày cập nhật: ', fulldate, true)
                .setFooter('Nguồn: worldometers.info');
            message.channel.send(embed);
        }
    },
};
