const IDs = require('./constantIDs');
const RESPONSES = require('./deletedReason');
const COLINID = IDs.colinID;

module.exports = {
    removeColin: function (message) {
        let authorID;
        
        try {
            authorID = message.author.id;
            listMentions = message.mentions.users
        }catch(error){
            console.log(error)
            return false
        }

        if( this.deleteChance(authorID) ) { 
            message.delete()
            let response = this.getReason();
            message.reply(response)
        }
        return true;
    },
    deleteChance: function(messageAuth) {
        if(this.isColin(messageAuth) && this.getRandomInt(2) === 1){
            return true
        }
        return this.getRandomInt(10) === 7;
    },
    isColin: function(snowFlake) {
        return snowFlake === COLINID;
    },
    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max))
    },
    isBot: function(messageAuth, botId) {
        return messageAuth === botId
    },
    getReason: function() {
        let responses = RESPONSES.listResponse;
        return responses[this.getRandomInt(responses.length)]
    }
};