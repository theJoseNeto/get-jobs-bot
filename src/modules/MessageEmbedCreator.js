const { MessageEmbed } = require("discord.js");

exports.injectLinksIntoEmbedMessages = async links => {

    let jobCounter = 0;
    const fields = [];
    const embed = new MessageEmbed()
        .setColor("#4402d8")
        .setThumbnail("http://2.bp.blogspot.com/-uFcSmMX9ImY/TioV1IdR6_I/AAAAAAAACYQ/x8-TFznGgvw/s1600/Get%25C3%25BAlio%2BVargas%2B1.jpg")
        .setDescription("[Seja um patrocinador dessa ideia a partir de R$01,00/mês](https://apoia.se/minhastack)")
        .setFooter({text: "Este projeto não tem nada haver com assuntos relacionados a política, é apenas uma piada ruim. ", iconURL:"https://avatars.githubusercontent.com/u/59847667?v=4"})

    for (let link of links){ 
        fields.push({ name: `Resultado ${jobCounter += 1}`, value: link, inline: false}); 
    }
    for (let field of fields) embed.addFields(field);

    return embed;
} 
