require('dotenv').config()
const config = require("./conf/config.js");
const TelegramBot = require('node-telegram-bot-api');
const translate = require('@k3rn31p4nic/google-translate-api');

const telegram = new TelegramBot(config.telegram.apiKey, {polling: true});

telegram.on('message', (msg) => {

  translate(msg.text, { to: 'en' }).then(res => {

    console.log("language : [" + res.from.language.iso + "] username : [" + `${msg.chat.username}` + "] message : [" + msg.text + "]");

    switch (res.from.language.iso) {

      case 'fr':
      translate(msg.text, {from: 'fr', to: 'en' }).then(res => {
        telegram.sendMessage(msg.from.id, "[EN] " + `${msg.chat.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      case 'en':
      translate(msg.text, {from: 'en', to: 'fr' }).then(res => {
        telegram.sendMessage(msg.from.id, "[FR] " + `${msg.chat.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });
      break;

      default:
      translate(msg.text, { to: 'en' }).then(res => {
        telegram.sendMessage(msg.from.id, "[EN] " + `${msg.chat.username} : `+ res.text);
      }).catch(err => {
        console.error(err);
      });

      translate(msg.text, { to: 'fr' }).then(res => {
        telegram.sendMessage(msg.from.id, "[FR] " + `${msg.chat.username} : ` + res.text);
      }).catch(err => {
        console.error(err);
      });
    }
  });
});
