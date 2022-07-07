const formatMessage = require("./formatmessage");
const Scrapper = require("./scrapper");
exports.botActions = async (client, message)=> {

    const discordServer = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
        const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
        const contentMessage = message.content;


        if(contentMessage == "/vaga" || contentMessage == "/Vaga"){
            console.log("Procurando vagas...")
            //const formatedMessage = formatMessage(message);
            const web = new Scrapper();
            web.scrapper("nodejs Junior", "Recife")
                .then(res => {
                    console.log(res);
                    message.reply(res)
                
                });
        } 
    
}

