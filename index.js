require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
var botID;
var colinID;

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  botID = client.user.id;
  colinID = "180822766856044544";
});

client.on('message', msg => {
  let authorID = msg.author.id;

  if( authorID === colinID){
    msg.delete(2000)
  }else if (msg.channel.type === 'text' && msg.content.startsWith("!ping")) {
    msg.reply('NO! ping you');
  }
});
