const isCorrectFormatMessage = message =>{ // message format expected= "PL: nodejs, level: Jr/Pl/Sr, locale: Recife"
    let isCorrectFormat = {
        correct: false,
        msg: null
    }    
    const splitedMessage = message.split(",");

    const PL = splitedMessage[0].split(":")[0].trim(); // PL:
    const level = splitedMessage[1].split(":")[0].trim(); // level
    const locale = splitedMessage[2].split(":")[0].trim(); // locale

    const allRight = PL === "PL" && level === "level" && locale === "locale";

    if(allRight) {
        isCorrectFormat.correct = true;
        isCorrectFormat.msg = message;
    } 

    return isCorrectFormat;
}


const formatMessage = (message)=>{ 

    const {correct, msg} = isCorrectFormatMessage(message);
    let searchFor = "";
   
    if(correct){
        const arrInfos = msg.split(",");
        const programmingLang = arrInfos[0].split(":")[1]; // PL: programming language
        const level = arrInfos[1].split(":")[1]; // level: Jr/Pl/Sr
        const locale = arrInfos[2].split(":")[1]; // locale: locale
        searchFor = `${programmingLang}${level}`;
    }

    return searchFor;
}
module.exports = formatMessage;