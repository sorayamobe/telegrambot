const express = require('express');
const { Telegraf } = require('telegraf');

//cargamos fichero de entorno:
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();

//webhook:
app.use(bot.webhookCallback('/secret-path'));
//url pública para que telegram mande las interacciones
bot.telegram.setWebhook('https://a297-78-30-8-104.ngrok.io/secret-path');

app.post('/secret-path', (req, res) => {
    res.end('Fin petición');
});

//COMANDOS
bot.command('test', require('./commands/test'));
bot.command('tiempo', require('./commands/tiempo'));
bot.command('donde', require('./commands/donde'));

bot.on('text', require('./nlu'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto' + PORT);
});