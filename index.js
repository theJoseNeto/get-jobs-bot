// require('dotenv').config();
const app = require("express")();
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.TOKEN;

const { botActions } = require('./src/modules/discord-bot');


app.get("/", (request, response)=>{
    client.login(token).then(() => {
        client.on("messageCreate", (message) => botActions(client, message));
        client.on("ready", () => console.log('client is ready!'));
    });

    response.send("<h3>Ops...</h3><br/><p>Disponível apenas em nosso <a href='https://discord.gg/wRu4bewKFD'>server do discord</a></p> ")

})
app.listen(process.env.PORT, ()=> console.log("Server is running!"))

