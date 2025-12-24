import { TelegramUser } from "../models/User.model.js";

const unbanMember = async (ctx) => {
  const chatId = process.env.CHAT_ID;
  const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
  const text = ctx.message.text;

  const status = member.status;
  if (status === "creator" || status === "administrator") {
    const replyUser = ctx.message.reply_to_message;
    const targetId = replyUser.from.id ; // آیدی کسی که می‌خوای بن/آن‌بن کنی

    if (targetId === ctx.botInfo.id) {
      return ctx.reply("🤖 من نمی‌تونم روی خودم این کارو انجام بدم!");
    }
    if (!replyUser) {
      return ctx.reply("روی پیام کاربر ریپلای کن که تا از بن بودن بکمش بیرون.");
    }
    const { id, first_name, username } = replyUser.from;

    // const chatId = ctx.chat.id;
    const result = await TelegramUser.findOne({ telegramId: id });

    if (result) {
      if (result.levelUser[0] === "simple") {
        return ctx.replyWithPhoto(
          "https://uploadkon.ir/uploads/b11a24_25gpt-image-1-a-Her-face-is-frowning.png",
          {
            reply_to_message_id: ctx.message.message_id,
            caption:
              "این کاربر ارتقا یافته.\nکاربر هایی که ارتقا یافته رو نمیشه بن کرد.\n تامام",
          }
        );
      }
      if (!result.isBan) {
        await TelegramUser.findOneAndUpdate(
          { telegramId: id },
          { isBan: true }
        );
        await ctx.telegram.banChatMember(chatId, id);
        await ctx.reply(
          `کاربر با ایدی :@${
            username ? username : "مرد حسابی یه ایدی براش خودت بسازز ضرر نمیکنی"
          }\n و با نام : ${first_name} \n برای همیشه از گروه بن شد.\n تا موقعی که ادمین از بن درش نیاره نمیتونه وارد گروه بشه `,
          {
            reply_to_message_id: ctx.message.message_id,
          }
        );
      } else {
        await ctx.reply("زور نزن قبلا بنش کردم😎😎", {
          reply_to_message_id: ctx.message.message_id,
        });
      }
    } else {
      await TelegramUser.create({
        telegramId: id,
        first_name: first_name,
        username: username,
        isBan: true,
      });
      await ctx.telegram.banChatMember(chatId, id);
      await ctx.reply(
        `کاربر با ایدی :@${
          username ? username : "مرد حسابی یه ایدی براش خودت بسازز ضرر نمیکنی"
        }\n و با نام : ${first_name} \n برای همیشه از گروه بن شد.\n تا موقعی که ادمین از بن درش نیاره نمیتونه وارد گروه بشه `,
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }
  }
};
export default unbanMember;
