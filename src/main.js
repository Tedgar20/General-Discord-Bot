const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN } = require('../config');

const common = require('./colinInterrupt');
var botID;

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  botID = client.user.id;
});

client.on('message', msg => {
  common.removeColin(msg)

  if (msg.content.startsWith("!ping")) {
    msg.reply('NO! ping you');
  }
});