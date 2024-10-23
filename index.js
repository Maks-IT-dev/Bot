import { Telegraf, Markup } from 'telegraf';
import { config } from './config.js'; // конфігурація, наприклад, з токеном бота
import { gameOptions, againOptions } from './options.js'; // опції для гри

// Ініціалізація бота
const bot = new Telegraf(config.telegramToken); // Використовуємо токен з config.js

const chats = {};

// Функція для запуску гри
const startGame = async (chatId) => {
  await bot.telegram.sendMessage(chatId, 'Зараз я загадаю цифру від 0 до 9, а ти маєш її вгадати!');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.telegram.sendMessage(chatId, 'Відгадай', gameOptions);
};

// Команди бота
bot.start((ctx) => {
  ctx.replyWithSticker('https://data.chpic.su/stickers/i/itishnichek/itishnichek_009.webp?v=1695323103');
  ctx.reply('Вітаю вас в телеграм боті автора Maks-It-Dev');
});

bot.command('info', (ctx) => {
  return ctx.reply(`Тебе звати ${ctx.from.first_name}`);
});

bot.command('game', (ctx) => {
  return startGame(ctx.chat.id);
});

// Обробка текстових повідомлень
bot.on('text', (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.chat.id;

  if (text !== '/start' && text !== '/info' && text !== '/game') {
    return ctx.reply('Я тебе не розумію, спробуй ще раз!');
  }
});

// Обробка callback-запитів
bot.on('callback_query', (ctx) => {
  const data = ctx.callbackQuery.data;
  const chatId = ctx.chat.id;

  if (data === '/again') {
    return startGame(chatId);
  }

  if (parseInt(data) === chats[chatId]) {
    return ctx.reply(`Вітаю, ти відгадав цифру ${chats[chatId]}`, againOptions);
  } else {
    return ctx.reply(`На жаль, ти не вгадав, бот загадав цифру ${chats[chatId]}`, againOptions);
  }
});

// Запуск бота
bot.launch();
