// require('dotenv').config();

const app = require("express")();

const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.TOKEN;

const { botActions } = require('./src/modules/discord-bot');

app.get('/', (req, res) => {
    res.send("<p>Essa aplicação só pode ser acessada em <a href='https://discord.gg/wRu4bewKFD'></a></p> <br/> <p><a href='https://minhastack.slcn.app'>MinhaStack</a></p>")
});


app.listen(process.env.PORT || 8080, () => {

    client.login(token).then(() => {
        client.on("messageCreate", (message) => botActions(client, message));
        client.on("ready", () => console.log('client is ready!'));
    });

});