const RESPONSES = require('../misc/quoteMap')
const JOINCHANNEL = require('./join');

module.exports = {
    isSoundClip(msg) {
        const VOICECHANNEL = msg.member.voice.channel;

        quotes = RESPONSES.soundClips
        content = msg.content
        streamOptions = { seek: 0, volume: 1 };

        if( quotes.hasOwnProperty(content) ){
            filePath = quotes[content]
            JOINCHANNEL.join(VOICECHANNEL, msg, filePath)
            return true
        }
        return false
    }
}