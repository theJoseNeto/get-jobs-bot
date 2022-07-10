require('dotenv').config();

const checkListOfTechnologies = tech => {

    let isValidTech;
    const technologiesList = ["javascript", "nodejs", "React", "python", "java", "php", "c#", "c++", "typeScript", "ruby", "c", "swift", "r", "objective-c", "shell", "scala", "go", "powerShell", "kotlin", "rust", "perl", "dart"]

    for (let itemListOfTechs of technologiesList) {
        if(itemListOfTechs === tech) {
            isValidTech = true;
            break;
        }
    }
    return isValidTech;
}

const checkProgrammerLevel =  level =>{
    let isValidLevel = false;
    const levels = ["junior", "pleno", "senior"]; 
    for(lvl in levels){
        if(lvl == level){
            isValidLevel = true;
            break; 
        }
    }
    return isValidLevel;
}

const checkListOfBrazilianStates = (UF = "Brasil")=> { 
    let isvalidState = {state: "", status: false}

    const states = [

        { 'AC': 'Acre' },
        { 'AL': 'Alagoas' },
        { 'AP': 'Amapá' },
        { 'AM': 'Amazonas' },
        { 'BA': 'Bahia' },
        { 'CE': 'Ceará' },
        { 'DF': 'Distrito Federal' },
        { 'ES': 'Espírito Santo' },
        { 'GO': 'Goías' },
        { 'MA': 'Maranhão' },
        { 'MT': 'Mato Grosso' },
        { 'MS': 'Mato Grosso do Sul' },
        { 'MG': 'Minas Gerais' },
        { 'PA': 'Pará' },
        { 'PB': 'Paraíba' },
        { 'PR': 'Paraná' },
        { 'PE': 'Pernambuco' },
        { 'PI': 'Piauí' },
        { 'RJ': 'Rio de Janeiro' },
        { 'RN': 'Rio Grande do Norte' },
        { 'RS': 'Rio Grande do Sul' },
        { 'RO': 'Rondônia' },
        { 'RR': 'Roraíma' },
        { 'SC': 'Santa Catarina' },
        { 'SP': 'São Paulo' },
        { 'SE': 'Sergipe' },
        { 'TO': 'Tocantins' },

    ];

    for(let state of states){
        if(state[UF]){
            isvalidState.state =  state[UF];
            isvalidState.status = true;
            break;
        }
    }
    return isvalidState;
}

exports.fomatMessage = (message = String) => { // expected message --> @Getulio vagas, nodejs, sênior, PE
    let formatedMessage = {
        content: { job: undefined, level: undefined, locale: undefined },
        status: false,
        errorMessage: 'Parece que você solicitou sua vaga de forma incorreta. Siga o modelo de mensagem a seguir e tente novamente: "@Getulio vagas, nodejs, sênior, PE" '
    }

    const splitedMessage = message.split(" ");
    
    const botMention = splitedMessage[0];
    const desiredTechnology = splitedMessage[2];
    const programmerLevel = splitedMessage[3];
    const locale = splitedMessage[4];

    const isValidLocale = checkListOfBrazilianStates(locale); 
    const isValidTech = checkListOfTechnologies(desiredTechnology);
    const isValidProgrammerLevel = checkProgrammerLevel(programmerLevel);
    const isBotMention = process.env.BOT_CODE_MENTION === botMention;

    if(isValidLocale && isValidTech && isValidProgrammerLevel && isBotMention){

        formatedMessage.content.job = desiredTechnology; 
        formatedMessage.content.level = programmerLevel; 
        formatedMessage.content.locale = locale;
        formatedMessage.status = true;
        formatedMessage.errorMessage = ""; 

    }

    return formatedMessage;

}
