const { PREFIX, PASSES } = require('../../../config');
const yt = require('ytdl-core');

module.exports = {
    name: 'play',
    description: '',
    execute(msg, args, queue) {
		if (queue[msg.guild.id] === undefined) 
			return msg.channel.send(`Add some songs to the queue first with ${PREFIX}add`);
		if (queue[msg.guild.id].playing) 
			return msg.channel.send('Already Playing');
		if (!msg.guild.voiceConnection) 
			join(msg)
		
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.send('Queue is empty').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : PASSES });
			
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(PREFIX + 'pause')) {
					msg.channel.send('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(PREFIX + 'resume')){
					msg.channel.send('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(PREFIX + 'skip')){
					msg.channel.send('skipped').then(() => {dispatcher.end();});
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.send('error: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift()); 
    }
}

function join (msg) {
	return new Promise((resolve, reject) => {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel || voiceChannel.type !== 'voice') 
			return msg.reply('I couldn\'t connect to your voice channel...');

		voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
	});
}