require('dotenv').config();
const {Client, Intents} = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env.TOKEN;
const Scrapper = require("./src/modules/scrapper");

const { bot } = require('./src/modules/discord-bot');
const { formatMessage } = require('./src/modules/formatmessage');

client.login(token).then(()=>{
    
    // bot(); o que tiver a seguir passar pra essa função "bot" dentro de ./src/modules/discord-bot.js

    client.on("message", async message => {
        console.log(message);

        const discordServer = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
        const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

        if (message.guild != discordServer) return; 
        const web = new Scrapper(); 
        const formattedMessage = formatMessage(message);
        web.scrapper();
        
        

    });
})