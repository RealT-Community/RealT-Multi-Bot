const config = require("./config/config.js");
process.env.NTBA_FIX_319 = config.telegram.ntbaFix;
const TelegramBot = require('node-telegram-bot-api');
const Discord = require("discord.js");
const translate = require('@k3rn31p4nic/google-translate-api');

const telegram = new TelegramBot(config.telegram.apiKey, {polling: true});
const discord = new Discord.Client();


discord.on('ready', function() {});
discord.login(config.discord.apiKey);



discord.on('message', (msg) => {

if(`${msg.author.username}` != config.discord.botName){

telegram.sendMessage(config.telegram.channelID, "Discord: " + `${msg.author.username} : ` + msg.content);

  translate(msg.content, { to: 'en' }).then(res => {

    console.log("language : [" + res.from.language.iso + "] username : [" + `${msg.author.username}` + "] message : [" + msg.content + "]");

    switch (res.from.language.iso) {

      case 'fr':
      translate(msg.content, {from: 'fr', to: 'en' }).then(res => {
        msg.channel.send("[EN] " + `${msg.author.username} : `+ res.text);
        telegram.sendMessage(config.telegram.channelID, "[EN] " + `${msg.author.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      case 'en':
      translate(msg.content, {from: 'en', to: 'fr' }).then(res => {
        msg.channel.send("[FR] " + `${msg.author.username} : `+ res.text);
        telegram.sendMessage(config.telegram.channelID, "[FR] " + `${msg.author.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      default:
      translate(msg.content, { to: 'en' }).then(res => {
        msg.channel.send("[EN] " + `${msg.author.username} : `+ res.text);
        telegram.sendMessage(config.telegram.channelID, "[EN] " + `${msg.author.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });

      translate(msg.content, { to: 'fr' }).then(res => {
        msg.channel.send("[FR] " + `${msg.author.username} : ` + res.text);
        telegram.sendMessage(config.telegram.channelID, "[FR] " + `${msg.author.username} : ` + res.text);
      }).catch(err => {
        console.error(err);
      });
    }
  });
};
});


telegram.on('message', (msg) => {

if((`${msg.from.username}` != config.telegram.botName) && ("@"+msg.chat.username == config.telegram.channelID)){


if (`${msg.from.first_name}` == 'undefined'){
  firstName = "";
} else {
  firstName = msg.from.first_name;
}
if (`${msg.from.last_name}` == 'undefined'){
  lastName = "";
} else {
  lastName = msg.from.last_name;
}

displayName = (firstName+" "+lastName);


  translate(msg.text, { to: 'en' }).then(res => {

    console.log("language : [" + res.from.language.iso + "] username : [" + `${displayName}` + "] message : [" + msg.text + "]");

    switch (res.from.language.iso) {

      case 'fr':
      translate(msg.text, {from: 'fr', to: 'en' }).then(res => {
        telegram.sendMessage(config.telegram.channelID, "[EN] " + `${displayName} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      case 'en':
      translate(msg.text, {from: 'en', to: 'fr' }).then(res => {
        telegram.sendMessage(config.telegram.channelID, "[FR] " + `${displayName} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      default:
      translate(msg.text, { to: 'en' }).then(res => {
        telegram.sendMessage(config.telegram.channelID, "[EN] " + `${displayName} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });

      translate(msg.text, { to: 'fr' }).then(res => {
        telegram.sendMessage(config.telegram.channelID, "[FR] " + `${displayName} : ` + res.text);
      }).catch(err => {
        console.error(err);
      });
    }
  });
};
});
