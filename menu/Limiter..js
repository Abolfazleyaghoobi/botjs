import { Markup } from "telegraf";
import { TelegramUser } from "../models/User.model.js";

const limiter = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    return await ctx.reply("لطفا این دستور را به پیام کاربری که می‌خواهید محدود کنید، پاسخ دهید.");
  }
  const { id, first_name, username } = ctx.message.reply_to_message.from;


  const isUser = await TelegramUser.findOne({ telegramId: id });
  if (!isUser) {
    
    const newUser = await TelegramUser.create({
      telegramId: id,
      first_name: first_name,
      username: username,
    });
    const photo = await ctx.telegram.getUserProfilePhotos(id);
    // check photo
    let fileId;
    if (photo.total_count > 0) { 
      fileId = photo.photos[0][0].file_id;
    }
    await ctx.replyWithPhoto(fileId, {
      reply_to_message_id: ctx.message.message_id,
      parse_mode: "HTML",
      caption: `چه چیز هایی رو میخوایی از این @${username?username:"خرمگش"} کاربر محدود کنی؟`, 
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("محدودیت ویدیو$عکس", `media:${id}:${username}:${first_name}`),
          Markup.button.callback("محدودیت گیف$استیکر", `sticker:${id}:${username}:${first_name}`), 
        ],
      ]),
    });
  } else {

    // get photo
    const photo = await ctx.telegram.getUserProfilePhotos(id);
    // check photo
    let fileId;
    if (photo.total_count > 0) {
      fileId = photo.photos[0][0].file_id;
    }
    await ctx.replyWithPhoto(fileId, { 
      reply_to_message_id: ctx.message.message_id,
      parse_mode: "HTML",
      caption: `چه چیز هایی رو میخوایی از این @${username} کاربر محدود کنی؟`,
      ...Markup.inlineKeyboard([
 
        [
          Markup.button.callback("محدودیت ویدیو$عکس", `media:${id}:${username}:${first_name}`),
          Markup.button.callback("محدودیت گیف$استیکر", `sticker:${id}:${username}:${first_name}`),
        ],
     
      ]),
    });
  }
};
export default limiter;
