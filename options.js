import { Markup } from 'telegraf';

export const gameOptions = {
    reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('1', '1'), Markup.button.callback('2', '2'), Markup.button.callback('3', '3')],
        [Markup.button.callback('4', '4'), Markup.button.callback('5', '5'), Markup.button.callback('6', '6')],
        [Markup.button.callback('7', '7'), Markup.button.callback('8', '8'), Markup.button.callback('9', '9')],
        [Markup.button.callback('0', '0')]
    ])
};

export const againOptions = {
    reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('Грати ще раз', 'again')]
    ])
};
