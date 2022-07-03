
formatMessage = (message)=>{ // message format expected= "PL: nodejs, level: Jr/Pl/Sr, locale: Recife"

    const arrInfos = message.split(",");

    const programmingLang = arrInfos[0].split(":")[1]; // PL: programming language
    const level = arrInfos[1].split(":")[1]; // level: Jr/Pl/Sr
    const locale = arrInfos[2].split(":")[1]; // locale: locale

    const searchFor = `${programmingLang}${level}`;

    return {searchFor, locale}

}

formatMessage("PL: nodejs, level: Jr/Pl/Sr, locale: Recife")
