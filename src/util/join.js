module.exports = {
    join (voiceChannel, member, link) {        
        const USERNICKNAME = member.nickname
        return new Promise((resolve, reject) => {
            if (!voiceChannel || voiceChannel.type !== 'voice') 
                console.log(USERNICKNAME + ' I couldn\'t connect to your voice channel...');
            else{
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.play(link, streamOptions);
                    dispatcher.on('finish', () => {
                        voiceChannel.leave()
                    });
                    dispatcher.on('error', () => {
                        console.error("There was an error playing the quote")
                        voiceChannel.leave()
                    });
                    resolve(connection)
                })
                .catch(err => reject(err));
            }
        });
    }
}