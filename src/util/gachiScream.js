const userIDs = require('./constantIDs')
const { PASSES } = require('../../config');
const JOINCHANNEL = require('./join');
const yt = require('ytdl-core');

module.exports = {
    screamOnEnter(oldMember, newMember) {
        const gachiLink = 'https://www.youtube.com/watch?v=RM88KhLw0oA'
    
        const newUserChannel = newMember.channel;
        const oldUserChannel = oldMember.channel;
        if(oldUserChannel === null && newUserChannel !== null){
            //User joined Channel
            const VOICECHANNEL = newMember.member.voice.channel;
            if(newMember.member.id === userIDs.chrisID || newMember.member.id === userIDs.ericaID){
                setTimeout(() => {
                    JOINCHANNEL.join(VOICECHANNEL, {})
                    .then(connection => {
                    const dispatcher = connection.play(yt(gachiLink, { audioonly: true }), { passes : PASSES });
                    dispatcher.on('finish', () => {
                        VOICECHANNEL.leave()
                    });
                    dispatcher.on('error', () => {
                        console.error
                        VOICECHANNEL.leave()
                    });
                })
                .catch(console.error)
                return true
                }, 10000)
            }
        } else if(newUserChannel === undefined){
            //User leaves a channel
        }
    }
}