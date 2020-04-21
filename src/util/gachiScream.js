const userIDs = require('./constantIDs')
const RESPONSES = require('../misc/quoteMap')
const JOINCHANNEL = require('./join');

module.exports = {
    screamOnEnter(oldMember, newMember) {
        const gachiLink = RESPONSES.soundClips.SCREAM
    
        const newUserChannel = newMember.channel;
        const oldUserChannel = oldMember.channel;
        if(oldUserChannel === null && newUserChannel !== null){
            //User joined Channel
            const VOICECHANNEL = newMember.member.voice.channel;
            const MEMBER = newMember.member;

            if(newMember.member.id === userIDs.edgarID || newMember.member.id === userIDs.ericaID){
                streamOptions = { seek: 0, volume: 1 };
                setTimeout(() => {
                    JOINCHANNEL.join(VOICECHANNEL, MEMBER, gachiLink)
                }, 25000)
            }
        } 
        else if(newUserChannel === undefined){
            //User leaves a channel
        }
    }
}