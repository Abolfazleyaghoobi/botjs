import findUserDB from "../../findUserDB/findUserDB.js";
import isAdmin from "../../isAdmin/isAdmin.js";
import { TelegramUser } from "../../models/User.model.js";

async function unupgrade(ctx) {
  const isCreator = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
  const result = isCreator.status;
  if (isAdmin(result)) {
    const userIdToUnupgrade = ctx.message.reply_to_message;
    if (userIdToUnupgrade) {
      const isAdminMember = await findUserDB(userIdToUnupgrade.from.id);

      if (isAdminMember) {
        if (isAdminMember[0].levelUser[0] == "simple") {
          await TelegramUser.updateOne(
            { telegramId: userIdToUnupgrade.from.id },
            { $set: { "levelUser.0": "member" } }
          );
          await ctx.replyWithPhoto(
            "https://uploadkon.ir/uploads/904522_25gemini-3-pro-image-preview-nano-banana-pro-a-She-has-folded-her-h.png",
            {
              caption: `کاربر @${userIdToUnupgrade.from.username} عزیز شما توسط ادمین تنزل مقام یافتید,امید بر این است که در آینده بتوانید دوباره ارتقا یابید!`,
            }
          );
          console.log(44);
        } else if (isAdminMember[0].levelUser[0] == "VIP") {
          // check isCreator
          const isCreator1 = await ctx.telegram.getChatMember(
            ctx.chat.id,
            ctx.from.id
          );

          if (isCreator1.status == "creator") {
            await TelegramUser.updateOne(
              { telegramId: userIdToUnupgrade.from.id },
              { $set: { "levelUser.0": "member", nickName: "" } }
            );
            await ctx.telegram.promoteChatMember(
              ctx.chat.id,
              userIdToUnupgrade.from.id,
              {
                can_change_info: false,
                can_delete_messages: false,
                can_invite_users: false,
                can_restrict_members: false,
                can_pin_messages: false,
                can_promote_members: false,
                can_manage_chat: false,
                can_manage_video_chats: false,
              }
            );
            await ctx.replyWithPhoto(
              "https://uploadkon.ir/uploads/545422_25gemini-3-pro-image-preview-nano-banana-pro-a-Taking-the-sign-from.png",
              {
                caption:
                  `ℹ️ اطلاعیه\n\n` +
                  `کاربر گرامی <a href="tg://user?id=${userIdToUnupgrade.from.id}">${userIdToUnupgrade.from.first_name}</a>\n\n` +
                  `بر اساس تصمیم سازنده گروه، در حال حاضر سطح دسترسی شما به حالت عادی بازگردانده شد.\n\n` +
                  `✨ این پایان راه نیست!\n` +
                  `امیدواریم با فعالیت و همراهی بیشتر، در آینده‌ای نزدیک دوباره شاهد ارتقای شما باشیم 🌱`,
                parse_mode: "HTML",
              }
            );
          } else {
            await ctx.reply("فقط ادمین حق داد که کاربر سطح ویژه را تنزل دهد", {
              reply_to_message_id: ctx.message.message_id,
            });
            return;
          }
        } else {
          await ctx.replyWithPhoto(
            "https://uploadkon.ir/uploads/c13f24_25gemini-3-pro-image-preview-nano-banana-pro-a-She-has-her-index-fi.png",
            {
              reply_to_message_id: ctx.message.message_id,
              caption: "این کاربر اصلا ارتقا داده نشده",
            }
          );
        }
      } else {
        await ctx.replyWithPhoto(
          "https://uploadkon.ir/uploads/c13f24_25gemini-3-pro-image-preview-nano-banana-pro-a-She-has-her-index-fi.png",
          {
            reply_to_message_id: ctx.message.message_id,
            caption: "این کاربر اصلا ارتقا داده نشده",
          }
        );
      }
    } else {
      await ctx.reply(
        ` توجه:
جهت تنزل مقام کاربر، حتماً روی پیام ارسال‌شده توسط او ریپلای نمایید.
`,
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
      return;
    }
  } else {
    await ctx.reply("شما ادمین نیستید و دسترسی تنزل مقام کاربران را ندارید!", {
      reply_to_message_id: ctx.message.message_id,
    });
    return;
  }
}

export default unupgrade;
