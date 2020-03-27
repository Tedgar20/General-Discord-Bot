const IDs = require('./constantIDs');
const RESPONSES = require('./deletedReason');
const COLINID = IDs.edgarID;

module.exports = {
    removeMessage: function (message) {
        if(message.author.bot && message.content.endsWith('.')){
            message.delete(2000)
            return true
        }
        let authorID;
        
        try {
            authorID = message.author.id;
            listMentions = message.mentions.users
        }catch(error){
            return error
        }

        if( deleteChance(authorID) ) { 
            message.delete()
            let response = getReason();
            message.reply(response)
        }
        return true;
    },
};

function deleteChance (messageAuth) {
    if(isColin(messageAuth) && getRandomInt(2) === 1){
        return true
    }
    return getRandomInt(10) === 7;
}
function isColin (snowFlake) {
    return snowFlake === COLINID;
}
function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
}
function getReason () {
    let responses = RESPONSES.listResponse;
    return responses[getRandomInt(responses.length)]
}