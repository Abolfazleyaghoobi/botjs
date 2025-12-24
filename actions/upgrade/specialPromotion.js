import { TelegramUser } from "../../models/User.model.js";
import { upgradeLock } from "../../Chat Membe MNG/upgradeMember.js";
import { Markup } from "telegraf";
let N_sentNickname;
async function specialPromotion(ctx) {
  try {
    const userId = Number(ctx.match[1]);
    const adminId = ctx.callbackQuery.from.id;
    const chatId = ctx.callbackQuery.message.chat.id;
    const messageId = ctx.callbackQuery.message.message_id;

    /* ===== چک مالک گروه ===== */
    const adminMember = await ctx.telegram.getChatMember(chatId, adminId);

    if (adminMember.status !== "creator") {
      return ctx.answerCbQuery(
        "⛔ فقط مالک گروه می‌تواند کاربر را به سطح ویژه ارتقا دهد",
        { show_alert: true }
      );
    }

    if (adminMember.is_anonymous) {
      return ctx.answerCbQuery(
        "⚠️ مالک گروه باید حالت Anonymous را خاموش کند",
        { show_alert: true }
      );
    }

    upgradeLock.isNickName = true;
    upgradeLock.userId = userId;
    upgradeLock.adminId = adminId;
    let timertime = 14;
    let timeline = "";

    await ctx.telegram.editMessageMedia(chatId, messageId, null, {
      type: "photo",
      media:
        "https://uploadkon.ir/uploads/966e24_25gemini-3-pro-image-preview-nano-banana-pro-a-He-has-a-notebook-in.png",
      caption:
        `زمان معکوس:${timertime}\n` +
        `لطفا قبل از تمام شدن زمان مشخص شده لقب رو انتخاب بکنید`,
      // parse_mode: "HTML",
    });
    N_sentNickname = setInterval(async () => {
      timertime -= 2;
      timeline += "💔";
      await ctx.telegram.editMessageMedia(chatId, messageId, null, {
        type: "photo",
        media:
          "https://uploadkon.ir/uploads/966e24_25gemini-3-pro-image-preview-nano-banana-pro-a-He-has-a-notebook-in.png",
        caption:
          `زمان معکوس:${timertime}\n` +
          `${timeline}\n` +
          `لطفا قبل از تمام شدن زمان مشخص شده لقب رو انتخاب بکنید`,
      });
      if (timertime == 0) {
        upgradeLock.isNickName = false;

        clearInterval(N_sentNickname);
        await ctx.replyWithPhoto(
          "https://uploadkon.ir/uploads/be8624_25gemini-3-pro-image-preview-nano-banana-pro-a-He-closes-the-notebo.png",
          {
            caption:
              "⏰ زمان انتخاب لقب ویژه به پایان رسید،لطفا دوباره تلاش کنید",
          }
        );
      }
    }, 2000);
  } catch (err) {
    console.error("specialPromotion error:", err);

    await ctx.answerCbQuery("❌ خطایی رخ داد، دوباره تلاش کنید", {
      show_alert: true,
    });
  }
}
export async function ali(ctx) {
  const title = ctx.message.text; // لقب وارد شده
  const chatId = ctx.chat.id;
  const userId = upgradeLock.userId;
  clearInterval(N_sentNickname);
  upgradeLock.isNickName = false;
  try {
    await TelegramUser.updateOne(
      { telegramId: userId },
      { $set: { "levelUser.0": "VIP", nickName: title } }
    );
    const resultUser = await TelegramUser.findOne({ telegramId: userId });

    await ctx.telegram.promoteChatMember(chatId, userId, {
      can_delete_messages: true,
      can_restrict_members: true,
      can_invite_users: true,
      can_pin_messages: true,
      can_manage_video_chats: true,
    });
    await ctx.telegram.setChatAdministratorCustomTitle(chatId, userId, title);
    await ctx.replyWithPhoto(
      "https://uploadkon.ir/uploads/f33022_25gemini-3-pro-image-preview-nano-banana-pro-a-A-detailed-anime-sty.png",
      {
        caption:
          `🎉 تبریک! 🎉\n\n` +
          `کاربر عزیز <a href="tg://user?id=${userId}">${resultUser.first_name}</a>\n\n` +
          `با افتخار اعلام می‌کنیم که توسط مالک گروه به ✨ سطح ویژه ✨ ارتقا یافتید.\n\n` +
          `🏷 لقب ویژه شما از این لحظه:\n` +
          `<b>「 ${title} 」</b>\n\n` +
          `🥇 این نشان افتخار از این پس در کنار نام شما خواهد بود.\n` +
          `به جمع کاربران ویژه خوش آمدید 💎`,
        parse_mode: "HTML",
      }
    );
  } catch (error) {}
}
export default specialPromotion;

// media:
// "https://uploadkon.ir/uploads/be8624_25gemini-3-pro-image-preview-nano-banana-pro-a-He-closes-the-notebo.png",
