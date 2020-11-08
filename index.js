require('dotenv').config()
const config = require("./conf/config.js");
const TelegramBot = require('node-telegram-bot-api');

const telegram = new TelegramBot(config.telegram.apiKey, {polling: true});

telegram.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  telegram.sendMessage(chatId, resp);
});

telegram.on('message', (msg) => {
  console.log(msg);
  telegram.sendMessage(msg.from.id, `Hello ${msg.chat.username}`);
});
