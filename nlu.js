const { Wit, log } = require('node-wit');
const fs = require('fs');

const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new log.Logger(log.DEBUG) // optional
});

module.exports = async (ctx) => {
    const res = await client.message(ctx.message.text);
    if (res.intents.length === 0) {
        ctx.reply('No entiendo!');
    } else {
        if (res.intents[0].confidence > 0.75) {
            ctx.reply('¿Me estás hablando de: ' + res.intents[0].name);
            const categoria = res.intents[0].name;
            const content = fs.readFileSync(`./frases/${categoria}.txt`, 'utf-8');
            const frases = content.split('\n');
            console.log(frases);
            ctx.reply(frases[Math.floor(Math.random() * frases.length - 1)]);
        } else {
            ctx.reply('No entiendo!');
        }

    }
    console.log(res);
    // ctx.reply('Hola!');
}