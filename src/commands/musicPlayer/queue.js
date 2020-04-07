const PREFIX = require('../../../config');


module.exports = {
    name: 'queue',
    description: '',
    execute(msg, args, queue) {
        if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${PREFIX}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		msg.channel.send(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
    }
}