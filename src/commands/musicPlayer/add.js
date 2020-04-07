const PREFIX = require('../../../config');

const yt = require('ytdl-core');

module.exports = {
    name: 'add',
    description: '',
    execute(msg, args, queue) {
        let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) 
			return msg.channel.send(`You must add a YouTube video url, or id after ${PREFIX}add`);

		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.send('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.send(`added **${info.title}** to the queue`);
		});
    }
}