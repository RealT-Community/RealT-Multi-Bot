require('dotenv').config()
const config = require("./conf/config.js");
const TelegramBot = require('node-telegram-bot-api');
const translate = require('@k3rn31p4nic/google-translate-api');

const telegram = new TelegramBot(config.telegram.apiKey, {polling: true});

telegram.on('message', (msg) => {
  translate(msg.text, { to: 'en' }).then(res => {
    telegram.sendMessage(msg.from.id, `${msg.chat.username} : `+ res.text);
    console.log("language : [" + res.from.language.iso + "] username : [" + `${msg.chat.username}` + "] message : [" + msg.text + "]");
  });
});
