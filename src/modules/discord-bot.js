const { fomatMessage } = require("./formatmessage");
const Scrapper = require("./scrapper");

exports.botActions = async (client, discordMessage) => {
    const web = new Scrapper();
    const discordServer = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    
    const contentMessage = discordMessage.content;
    const formatedMesage = fomatMessage(contentMessage);

    if(formatedMesage.status == true) {
        const {content : res} = formatedMesage;
        const searchForThis = `${res.job} ${res.level}`;
        const inThisLocale = res.locale; 
        web.scrapper(searchForThis, inThisLocale)
            .then (data => {
                const newMessage = data.join().replace(",", "\n\n");
                discordMessage.reply(newMessage);
            }); 
     } 
}
