const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN, PREFIX } = require('../config');

client.commands = new Discord.Collection();

const generalCommandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
const musicCommandFiles = fs.readdirSync('src/commands/musicPlayer').filter(file => file.endsWith('.js'));

for (const file of generalCommandFiles){
  const command = require(`./commands/${file}`);
  console.log(command.name)
  client.commands.set(command.name, command)
}
for (const file of musicCommandFiles){
	const command = require(`./commands/musicPlayer/${file}`);
	console.log(command.name)
	client.commands.set(command.name, command)
  }

let queue = {};

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	bot = msg.author.bot

	if(!bot){
		const args = msg.content.slice(PREFIX.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		if(!client.commands.has(commandName)) return

		const cmd = client.commands.get(commandName)

		try {
			cmd.execute(msg, args, queue);
		}catch (error) {
			console.log(error)
			msg.reply('There was an error with your command')
		}
	}
});