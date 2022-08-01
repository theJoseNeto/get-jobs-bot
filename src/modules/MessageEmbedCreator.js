const { MessageEmbed } = require("discord.js");

exports.injectLinksIntoEmbedMessages = async links => {
    let jobCounter = 0;
    const fields = [];
    const embed = new MessageEmbed()
        .setColor("#4402d8")
        .setDescription("Seja um patrocinador dessa ideia a partir de R$01,00/mês: https://apoia.se/minhastack")

    for (let link of links) fields.push({ name: `vaga ${jobCounter += 1}`, value: link });
    for (let field of fields) embed.addFields(field);

    return embed;
} 
