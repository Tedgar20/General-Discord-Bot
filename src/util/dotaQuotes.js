const RESPONSES = require('../misc/quoteMap')
const JOINCHANNEL = require('./join');

module.exports = {
    isDotaQuote(msg) {
        const VOICECHANNEL = msg.member.voice.channel;

        quotes = RESPONSES.dotaVoiceLines
        content = msg.content
        streamOptions = { seek: 0, volume: 1 };

        if( quotes.hasOwnProperty(content) ){
            filePath = quotes[content]

            JOINCHANNEL.join(VOICECHANNEL, msg)
            .then(connection => {
                const dispatcher = connection.play(filePath, streamOptions);
                dispatcher.on('finish', () => {
                    VOICECHANNEL.leave()
                });
                dispatcher.on('error', () => {
                    msg.reply("There was an error playing the quote")
                    console.error
                    VOICECHANNEL.leave()
                });
            })
            .catch(console.error)
            return true
        }
        return false
    }
}