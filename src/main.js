const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN } = require('../config');
var botID;
var colinID;
var edgarId;

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  botID = client.user.id;
  colinID = "180822766856044544";
  edgarId = "180856877154828288";
});

client.on('message', msg => {
  let authorID = msg.author.id;
  //let listMentions = msg.mentions.users
  //let edgarMention = listMentions.filter(snowFlake => snowFlake === edgarId)
  //console.log("List of mentions ", listMentions.user)
  //console.log("Edgar was mentioned here is ID ", edgarMention)
  //let colinMention = listMentions.filter(snowFlake => snowFlake === colinID)

  if( authorID === colinID){
    msg.delete(2000)
  }else if (msg.channel.type === 'text' && msg.content.startsWith("!ping")) {
    msg.reply('NO! ping you');
  }
});
