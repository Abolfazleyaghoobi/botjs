import { TelegramUser } from "../../models/User.model.js";
import { upgradeLock } from "../../Chat Membe MNG/upgradeMember.js";
import { Markup } from "telegraf";

async function upgradeSimple(ctx) {
  const userId = Number(ctx.match[1]);
  const adminId = Number(ctx.match[2]);
  const chatId = process.env.CHAT_ID;
  if (ctx.from.id !== adminId) {
    await ctx.replyWithPhoto(
      "https://uploadkon.ir/uploads/3b9216_25gpt-image-1-a-The-ureter-should-ha.png",
      {
        caption: `شما مجاز به ارتقا کاربر نیستید`,
      }
    );
    return;
  }
  if (upgradeLock.timeout) {
     clearInterval(upgradeLock.timeout);
  }
  upgradeLock.isLocked = false;
  upgradeLock.adminId = null;
  upgradeLock.timeout = null;


  // find user and upgrade
  const user = await TelegramUser.findOne({ telegramId: userId });
  console.log("user: ", user.levelUser);
  if (user.levelUser[0] === "member") {
    await TelegramUser.updateOne(
      { telegramId: userId },
      { $set: { "levelUser.0": "simple" } }
    );
    //
    const chatId = ctx.callbackQuery.message.chat.id;
    const messageId = ctx.callbackQuery.message.message_id;

    await ctx.telegram.editMessageMedia(
      chatId,
      messageId,
      null,
      {
        type: "photo",
        media:
          "https://s6.uupload.ir/files/gemini_generated_image_iok8mviok8mviok8_0bel.png",
        caption: "کاربر به سطح متوسط ارتقا یافت ✅",
      },
      {
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("بستن", "close")]
        ]).reply_markup
      }
    );
    

 
  }

  // console.log({ userId, adminId });
}

export default upgradeSimple;
