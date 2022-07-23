
const checkListOfTechnologies = tech => {

    let isValidTech = false;
    const technologiesList = ["javascript", "nodejs", "React", "python", "java", "php", "c#", "c++", "typeScript", "ruby", "Ruby","c", "swift", "r", "objective-c", "shell", "scala", "go", "powerShell", "kotlin", "rust", "perl", "dart"]

    for (let itemListOfTechs of technologiesList) {
        if(itemListOfTechs === tech) {
            isValidTech = true;
            break;
        }
    }
    return isValidTech;
}

const checkProgrammerLevel =  level =>{
    
    let isValidProgrammerLevel = false;
    const levels = ["Junior", "Pleno", "Senior", "junior", "pleno", "senior", "jr", "pl", "sr", "JR", "PL", "SR", "Jr", "Pl", "Sr"]; 

    for(lvl of levels){
        if(lvl === level){
            isValidProgrammerLevel = true;
            break;
        }
    }

    return isValidProgrammerLevel;

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
        errorMessage: 'Parece que você solicitou sua vaga de forma incorreta. Siga o modelo de mensagem a seguir e tente novamente: "/Solicitar, nodejs, sênior, PE" '
    }

    const splitedMessage = message.split(",");

    const botMention = splitedMessage[0].trim(); 
    const desiredTechnology = splitedMessage[1].trim();
    const programmerLevel = splitedMessage[2].trim();
    const locale = splitedMessage[3].trim();

    const isValidLocale = checkListOfBrazilianStates(locale); 
    const isValidTech = checkListOfTechnologies(desiredTechnology); 
    const isValidProgrammerLevel = checkProgrammerLevel(programmerLevel); 
    const isBotMention = botMention === "/Solicitar"; 

    if(isValidLocale.status && isValidTech && isValidProgrammerLevel && isBotMention){

        formatedMessage.content.job = desiredTechnology; 
        formatedMessage.content.level = programmerLevel; 
        formatedMessage.content.locale = isValidLocale.state;
        formatedMessage.status = true;
        formatedMessage.errorMessage = ""; 

    }

    return formatedMessage;

}
