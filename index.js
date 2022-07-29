// require('dotenv').config();
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.TOKEN;

const { botActions } = require('./src/modules/discord-bot');


    client.login(token).then(() => {
        client.on("messageCreate", (message) => botActions(client, message));
        client.on("ready", () => console.log('client is ready!'));
})



