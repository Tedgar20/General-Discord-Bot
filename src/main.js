const fs = require('fs');
const REMOVE = require('./util/chanceRemoval')

const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN, PREFIX } = require('../config');

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command)
}

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if( !msg.content.startsWith(PREFIX) ) {
      try {
        REMOVE.removeMessage(msg)
      }catch (error) {
        console.log(error)
        msg.reply('WHAT!? You managed to avoid deletion')
      }
  }

  const args = msg.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if(!client.commands.has(commandName)) return

  const cmd = client.commands.get(commandName)

  try {
    cmd.execute(msg, args);
  }catch (error) {
    console.log(error)
    msg.reply('There was an error with your command')
  }
});