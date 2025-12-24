import 'dotenv/config'; 

// @ts-ignore
import { Markup, Telegraf } from "telegraf";
//import newChatMember from "./eventHandler/newChatMembers.js";
import "./config/db.js";
import start from "./commond/start.js";
// const chatId = -1002286392590;

import text from "./eventHandler/chat.js";
import callback from "./eventHandler/callback.js";
import muteList from "./actions/muteList.js";
import backToPanel from "./actions/backToPanel.js";
import banList from './actions/blackList.js';
import upgradeSimple from './actions/upgrade/upgradeSimple.js';
import {upgradeLock} from "./Chat Membe MNG/upgradeMember.js";
import specialPromotion from './actions/upgrade/specialPromotion.js';



// const token = "8247892224:AAE1OEl7fADgsvEiMAz_7ge4uwCkrPMUBAQ"; 
const token = process.env.TOKEN_BOT; 

const bot = new Telegraf(token); 
 bot.use((ctx, next) => {
  // اگر چت وجود نداره
  if (!ctx.chat) return;

  // اگر PV هست
  if (ctx.chat.type === "private") {
    // فقط /start اجازه اجرا داره
    if (ctx.message?.text === "/start") {
      return next();
    }
    return;
  }

  // group / supergroup
  return next();
});

bot.start(start);
bot.on("message", text);

// actions
bot.action(/^mutedList:(.+)$/, muteList)
bot.action(/^bannedList:(.+)$/, banList)
bot.action(/^backToPanel:(.+)$/, backToPanel) 
bot.action(/^upgradeSimple:(\d+):(\d+)$/,upgradeSimple);
bot.action(/^specialPromotion:(\d+):(\d+)$/,specialPromotion);
bot.action("close", async(ctx)=>{
  const messageId = ctx.callbackQuery.message.message_id;
  const chatId = ctx.callbackQuery.message.chat.id;
  if (upgradeLock.timeout) {
    clearInterval(upgradeLock.timeout);
  }
  upgradeLock.isLocked = false;
  upgradeLock.adminId = null;
  upgradeLock.timeout = null;
  await ctx.telegram.deleteMessage(chatId, messageId);
  
    // console.log("ali");
    
})


















bot.on("callback_query", callback);










































const ALLOWED_CHAT_ID = Number(process.env.CHAT_ID);

bot.on("my_chat_member", async (ctx) => {
  const chatId = ctx.chat.id;
  const status = ctx.myChatMember.new_chat_member.status;

  // فقط زمانی که ربات تازه وارد شده یا ادمین شده
  const joinedStatuses = ["member", "administrator"];

  if (!joinedStatuses.includes(status)) return;

  // اگر گروه مجاز نیست → لفت بده
  if (chatId !== ALLOWED_CHAT_ID) {
    try {
      await ctx.reply(
        "کیر و کوس دالگت که منو عضو گروهت  کردی، من فقط برای گروه خاصی ساخته شدم، حالا میرم بیرون خدافظ!👋"
      );

      await ctx.telegram.leaveChat(chatId);

      console.log(`🚪 Bot left unauthorized chat: ${chatId}`);
    } catch (err) {
      console.error("Error leaving unauthorized chat:", err);
    }
  }
});

  
// console.log(process.env.TOKEN);

export default bot;

// creator
// administrator

