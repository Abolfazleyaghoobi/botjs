import { Markup } from "telegraf";
import isAdmin from "../isAdmin/isAdmin.js";
import { TelegramUser } from "../models/User.model.js";
export let upgradeLock = {
  isLocked: false,
  adminId: false,
  timeout: false,
  isNickName: false,
  userId:false
};

// امان نامه
async function upgrageMember(ctx) {
  const chatId = process.env.CHAT_ID;
  const adminInfo = ctx.from;
  const member = await ctx.telegram.getChatMember(chatId, adminInfo.id);
  const status = member.status;

  if (isAdmin(status)) {
    if (upgradeLock.isLocked) {
      ctx.reply(
        "⏳ در حال حاضر یک ادمین دیگر در حال ارتقا کاربر دیگری است.\nلطفاً چند ثانیه صبر کنید."
      );
      return;
    }
    // پیام ریپلای شده
    const replyUser = ctx.message.reply_to_message;
    if (!replyUser) {
      ctx.reply("اناناس\nاول ریپلای کن  بعد ارتقا بده.");
      return;
    }
    upgradeLock.isLocked = true; 

    // info user reply
    const replyUserInfo = replyUser.from;
    // ///////////////////////////////////////////
    const member = await ctx.telegram.getChatMember(chatId, replyUserInfo.id);

    const status = member.status;
    if (isAdmin(status)) {
      ctx.reply("اناناس");
      // آزاد کردن قفل
      upgradeLock.isLocked = false;
      upgradeLock.adminId = null;
      upgradeLock.timeout = null;
      return;
    }
    const result = await TelegramUser.findOne({ telegramId: replyUserInfo.id });
    if (result) {
      const isVIP = result.levelUser[0];
      if (isVIP === "member") {
        const sentMessage = await ctx.replyWithPhoto(
          "https://uploadkon.ir/uploads/492519_25gemini-3-pro-image-preview-nano-banana-pro-a-He-wears-dark-glasse.png",
          {
            reply_to_message_id: replyUser.message_id,
            caption:
              `سلام ${adminInfo.first_name}\n\n` +
              `در اینجا دوتا قرص داری یکیش آبیه یکی دیگه قرمز\n\n` +
              `و اما تو ادمین حق داری که یکی از اینهارو برای کاربر بدی.\n\n` +
              `یه ادمین ساده میتونه فقط قرص ابی رو به کاربر بده تا سطحش یه لول ارتقا پیدا کنه.\n\n` +
              `و اما یه توضیح  کوچولو در باره این قرص ها بدم بد نیست که بدونید:\n\n` +
              `🔵قرص آبی:با این قرص کاربر از بن شدن و سکوت خوردن در امانه \n\n` +
              `و اما\n\n` +
              `🔴قرص قرمز:این یه قرصیه که فقط مالک گروه میتونه به کاربر بده,با اینکارش اون کاربر ویژه میشه عملا  ادمین میشه ولی دسترسی محدودی داره ولی از همه لحاظ ایمن تره.`,
            ...Markup.inlineKeyboard([
              [
                Markup.button.callback(
                  "🔵",
                  `upgradeSimple:${replyUserInfo.id}:${adminInfo.id}`
                ),
                Markup.button.callback("🔴", `specialPromotion:${replyUserInfo.id}:${adminInfo.id}`),
              ],
              [Markup.button.callback("لغو این عملیات❌", "close")],
            ]),
          }
        );
        
        upgradeLock.timeout = setInterval(async () => {
          console.log(29);
          if (upgradeLock.isNickName) {
            console.log(25);
            return;
          } 
          try {
            await ctx.telegram.deleteMessage(  
              ctx.chat.id,
              sentMessage.message_id
            );
          } catch (e) {
            console.log("e: ", e);
          }

          // آزاد کردن قفل
          clearInterval(upgradeLock.timeout);
          upgradeLock.isLocked = false;
          upgradeLock.adminId = null;
          upgradeLock.timeout = null;
          
        }, 5000);
      } else {
        ctx.reply("این کاربر قبلا امان نامه گرفته", {
          reply_to_message_id: replyUser.message_id,
        });
        // آزاد کردن قفل
        upgradeLock.isLocked = false;
        upgradeLock.adminId = null;
        upgradeLock.timeout = null;
        return;
      }
    } else {
      await TelegramUser.create({
        telegramId: replyUserInfo.id,
        first_name: replyUserInfo.first_name,
        username: replyUserInfo.username,
      });

      ctx.replyWithPhoto(
        "https://uploadkon.ir/uploads/492519_25gemini-3-pro-image-preview-nano-banana-pro-a-He-wears-dark-glasse.png",
        {
          reply_to_message_id: replyUser.message_id,
          caption:
            `سلام ${adminInfo.first_name}\n\n` +
            `در اینجا دوتا قرص داری یکیش آبیه یکی دیگه قرمز\n\n` +
            `و اما تو ادمین حق داری که یکی از اینهارو برای کاربر بدی.\n\n` +
            `یه ادمین ساده میتونه فقط قرص ابی رو به کاربر بده تا سطحش یه لول ارتقا پیدا کنه.\n\n` +
            `و اما یه توضیح  کوچولو در باره این قرص ها بدم بد نیست که بدونید:\n\n` +
            `🔵قرص آبی:با این قرص کاربر از بن شدن و سکوت خوردن در امانه \n\n` +
            `و اما\n\n` +
            `🔴قرص قرمز:این یه قرصیه که فقط مالک گروه میتونه به کاربر بده,با اینکارش اون کاربر ویژه میشه عملا  ادمین میشه ولی دسترسی محدودی داره ولی از همه لحاظ ایمن تره.`,
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback(
                "🔵",
                `upgradeSimple:${replyUserInfo.id}:${adminInfo.id}`
              ),
              Markup.button.callback("🔴", `specialPromotion:${replyUserInfo.id}:${adminInfo.id}`),
            ],
            [Markup.button.callback("لغو این عملیات❌", "close")],
          ]),
        }
      );
    }
  }
}

export default upgrageMember;
