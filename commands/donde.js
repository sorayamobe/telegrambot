const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY
}

module.exports = async ctx => {

    const city = ctx.message.text.slice(8);
    //o también:
    //const ciudad = ctx.message.text.split('/donde ')[1];

    const geocoder = NodeGeocoder(options);
    const res = await geocoder.geocode(city);

    //para mapas estáticos:
    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${res[0].latitude},${res[0].longitude}&zoom=17&size=600x400&key=${options.apiKey}`;

    console.log(map);

    ctx.reply('Holi');

    ctx.replyWithLocation(res[0].latitude, res[0].longitude);
    //otra forma de responder sería:
    ctx.replyWithPhoto(map);

}