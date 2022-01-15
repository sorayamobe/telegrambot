const axios = require('axios');

module.exports = async (ctx) => {

    const city = ctx.message.text.slice(8);
    // O también:
    //const ciudad = ctx.message.text.split('/tiempo ')[1];

    // console.log(city);

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + process.env.BOT_TOKEN + '&units=metric');

    // console.log(response.data);

    const answer = `El tiempo en ${city} es:
    🌡 TEMP: ${data.main.tem}º
    ❄️ MIN: ${data.main.min}º
    🔥 MAX: ${data.main.max}º`;

    ctx.reply(answer);
};