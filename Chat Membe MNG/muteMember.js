import { TelegramUser } from "../models/User.model.js";


const muteMember = async (ctx) => {
  const chatId = process.env.CHAT_ID;
  const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
  const text = ctx.message.text;
  const status = member.status;
  if (status === "creator" || status === "administrator") {
    //~~ info andmin or creator
    const infoAdmin= ctx.from;
    const replyUser = ctx.message.reply_to_message;
    const targetId = replyUser.from.id ; // آیدی کسی که می‌خوای بن/آن‌بن کنی

    if (targetId === ctx.botInfo.id) {
      return ctx.reply("🤖 من نمی‌تونم روی خودم این کارو انجام بدم!");
    }
    if (!replyUser) {
      return ctx.reply("روی پیام کاربر ریپلای کن که تا سکوتش کنی.");
    }
    //~~ info of replied user 
    const { id, first_name, username } = replyUser.from;
    //~ check if the replied user is admin or creator
    const member = await ctx.telegram.getChatMember(chatId, id);
    const status = member.status;
    if (status === "administrator" || status === "creator") {
        if (infoAdmin.id===7763463127) {
            return ctx.replyWithPhoto("https://uploadkon.ir/uploads/550116_25Gemini-Generated-Image-okmkihokmkihokmk.png",{
                reply_to_message_id: ctx.message.message_id,
                caption:`اخه تو که ادمینی نمیتونی ادمین دیگه لو سکوت بدی `
              }) 
        }else{
            return ctx.replyWithPhoto("https://uploadkon.ir/uploads/03fc20_25cute-and-mysterious-.png",{
                reply_to_message_id: ctx.message.message_id,
                caption:`د اخه گوزو ادمین نمتونه ادمین دیگه رو سکوت بده `
              })
        }
    } else { 
      const result = await TelegramUser.findOne({ telegramId: id });
      if(result.levelUser[0]=="simple"){
        return ctx.replyWithPhoto("https://uploadkon.ir/uploads/b11a24_25gpt-image-1-a-Her-face-is-frowning.png",{
          reply_to_message_id: ctx.message.message_id,
          caption:"این کاربر ارتقا یافته.\nکاربر هایی که ارتقا یافته رو نمیشه سکوت کرد.\n تامام"
        })
  
      }
      if (result) {
        if (!result.isMute) {
          await TelegramUser.findOneAndUpdate(
            { telegramId: id },
            { isMute: true }
          );
          await ctx.telegram.restrictChatMember(chatId, id, {
            can_send_messages: false,
            can_send_media_messages: false,
            can_send_other_messages: false,
            can_send_polls: false,
            can_add_web_page_previews: false,
            can_change_info: false,
            can_invite_users: false,
            can_pin_messages: false,
          });
          await ctx.reply(
            `اینقدری که (${first_name})زر زدی اخرش بهت سکوت دادن😎😎`
          );
        } else {
          await ctx.reply(
            `عزیزم سکوت خورده نیاز نیست دوباره سکوتش کنی \n <<<${first_name} @${
              username ? username : "ریدم بهت که ایدی نداری"
            } >>>`
          );
        }
      } else {
        await TelegramUser.create({
          telegramId: id,
          first_name: first_name,
          username: username,
          isMute: true,
        });
        await ctx.telegram.restrictChatMember(chatId, id, {
          can_send_messages: false,
          can_send_media_messages: false,
          can_send_other_messages: false,
          can_send_polls: false,
          can_add_web_page_previews: false,
          can_change_info: false,
          can_invite_users: false,
          can_pin_messages: false,
        });
        await ctx.reply(
          `اینقدری که (${first_name})زر زدی اخرش بهت سکوت دادن😎😎`
        );
      }
    }
  }
  else{
    await ctx.reply("❌ شما دسترسی لازم برای استفاده از این دستور را ندارید.");
  }
};
export default muteMember;
