require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { fomatMessage } = require("./formatmessage");
const { injectLinksIntoEmbedMessages } = require('./MessageEmbedCreator');
const Scrapper = require("./scrapper");

const embedMessage = new MessageEmbed();

exports.botActions = async (client, discordMessage) => {

    const web = new Scrapper();
    const discordServer = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

    if (discordMessage.guild == discordServer) {

        const contentMessage = discordMessage.content;
        const formatedMesage = fomatMessage(contentMessage); // 

        if (formatedMesage.status == true) {

            const { content: res } = formatedMesage;
            const searchForThis = `${res.job} ${res.level}`;
            const inThisLocale = res.locale;

            web.scrapper(searchForThis, inThisLocale)
                .then(async LinksToJobs => { //[{title, url}]

                    await injectLinksIntoEmbedMessages(LinksToJobs)
                        .then(embed => {
                            channel.send({ embeds: [embed] });
                        });
                    });
        }
    }

}
