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
  const LISTMENTIONS = msg.mentions.users.map(snowflake => snowflake.id);
  const AMIBOT = common.isBot(msg.author.id, botID);

  if( !AMIBOT ){
    common.removeColin(msg)
  }if( AMIBOT && LISTMENTIONS.length === 1 ){
    msg.delete(2000)
  }
});