const IDs = require('./constantIDs');
const colinID = IDs.colinID;

module.exports = {
    removeColin: function (message) {
        let authorID;
        let listMentions;
        
        try {
            authorID = message.author.id;
            listMentions = message.mentions.users
        }catch(error){
            console.log(error)
            return false
        }
        let listIDs = listMentions.map(snowFlake => snowFlake.id)

        if( authorID !== colinID && listIDs.indexOf(colinID) === -1){
            return false
        }     
        message.delete(2000)
        return true;
    },
};