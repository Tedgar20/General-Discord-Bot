module.exports = {
    join (voiceChannel, msg) {
        return new Promise((resolve, reject) => {
            if (!voiceChannel || voiceChannel.type !== 'voice') 
                return msg.reply('I couldn\'t connect to your voice channel...');

            voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        });
    }
}