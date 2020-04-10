const { PREFIX, PASSES } = require('../../../config');
const JOINCHANNEL = require('../../util/join');

const yt = require('ytdl-core');

module.exports = {
    name: 'play',
    description: '',
    execute(msg, args, queue) {
		const VOICECHANNEL = msg.member.voice.channel;

		if (queue[msg.guild.id] === undefined) 
			return msg.channel.send(`Add some songs to the queue first with ${PREFIX}add`);
		if (queue[msg.guild.id].playing) 
			return msg.channel.send('Already Playing');
		if (!msg.guild.voiceConnection){
			JOINCHANNEL.join(VOICECHANNEL, msg)
			.then( connection => { 
				let dispatcher;
				queue[msg.guild.id].playing = true;

				console.log(queue);
				(function play(song) {
					console.log(song);
					if (song === undefined) return msg.channel.send('Queue is empty').then(() => {
						queue[msg.guild.id].playing = false;
						VOICECHANNEL.leave();
					});
					msg.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
					dispatcher = connection.play(yt(song.url, { audioonly: true }), { passes : PASSES });
					
					const COLLECTOR = msg.channel.createMessageCollector(m => m);

					COLLECTOR.on('collect', m => {
						if (m.content.startsWith(PREFIX + 'pause')) {
							msg.channel.send('paused').then(() => {dispatcher.pause();});
						} else if (m.content.startsWith(PREFIX + 'resume')){
							msg.channel.send('resumed').then(() => {dispatcher.resume();});
						} else if (m.content.startsWith(PREFIX + 'stop')){
							msg.channel.send('stopped').then(() => {
								dispatcher.destroy();
								VOICECHANNEL.leave();
							});
						}
					});
					dispatcher.on('finish', () => {
						COLLECTOR.stop();
						play(queue[msg.guild.id].songs.shift());
					});
					dispatcher.on('error', (err) => {
						return msg.channel.send('error: ' + err).then(() => {
							COLLECTOR.stop();
							play(queue[msg.guild.id].songs.shift());
						});
					});
				})(queue[msg.guild.id].songs.shift()); 
			})
		}
	}
}