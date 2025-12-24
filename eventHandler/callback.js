import sendVideoPhoto from "../menu/limiters/sendVidoePhoto.js";
import sendGitAndStickerLimiter from "../menu/limiters/senGifAndSticker.js";
import { TelegramUser } from "../models/User.model.js";
// const chatId = -1002286392590;
// _________________________
// const chatId = -1003292325744;
const chatId = process.env.CHAT_ID;
const callback=async (ctx) => {
    // console.log("ctx: ", ctx.callbackQuery.message.chat.id);
//   change permission in database
    async function togglePermission(userId, permissionKey) {
      const user = await TelegramUser.findOne({ telegramId: userId });
  
      const currentValue = user.permissions[permissionKey];
  
      await TelegramUser.updateOne(
        { telegramId: userId },
        { $set: { [`permissions.${permissionKey}`]: !currentValue } }
      );
  
      return !currentValue;
    } 
    const { status } = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
    // check if user is admin or creator
    if (status === "creator" || status === "administrator") {
        // get data
      const userId = ctx.callbackQuery.data.split(":")[1];
      const username = ctx.callbackQuery.data.split(":")[2];
      const first_name = ctx.callbackQuery.data.split(":")[3];
      const textCall = ctx.callbackQuery.data.split(":")[0];
    //   check type of callback
      if (textCall === "sticker") { 
        await togglePermission(+userId, "can_send_other_messages");
        sendGitAndStickerLimiter(chatId,userId,ctx,username,first_name)
      }else if (textCall === "media") {
        await togglePermission(+userId, "can_invite_users");
        sendVideoPhoto(chatId,userId,ctx,username,first_name)
      }else{
        await ctx.answerCbQuery("هنوز در حال توسعست 😎😎😎😎", { show_alert: true });
      }
  
  
    }
    // if not admin or creator
    else {
      await ctx.answerCbQuery(
        "❌ شما دسترسی لازم برای استفاده از این دکمه را ندارید.",
        { show_alert: true }
      );
    }
    //    console.log('userId: ', userId);
  }
  export default callback;