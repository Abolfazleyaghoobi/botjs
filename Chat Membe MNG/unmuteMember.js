import { TelegramUser } from "../models/User.model.js";


const unmuteMember = async (ctx) => {
    const chatId = process.env.CHAT_ID;
    const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
    const text = ctx.message.text;
    const status = member.status;
    if (status==="creator" || status==="administrator") {
        const replyUser = ctx.message.reply_to_message;
        if (!replyUser) {
            return ctx.reply("اگه میخوای کسی رو از سکوت در بیاری روی پیامش ریپلای کن");
        }
        const { id, first_name, username } = replyUser.from;
        const result= await TelegramUser.findOne({ telegramId: id });
        if (result) {
            if (result.isMute) {
                await TelegramUser.findOneAndUpdate({ telegramId: id },{isMute:false});
                await ctx.telegram.restrictChatMember(chatId, id, {
                     can_send_messages: true,
                     can_send_media_messages: true,
                     can_send_other_messages: true,
                     can_send_polls: true,
                     can_add_web_page_previews: true,
                     can_change_info: true,
                     can_invite_users: true,
                     can_pin_messages: true,
                })
                await ctx.reply(`از سکوت در اومدی مواظب باش که دوباره زر زدنات شروع نشه که ادمین دوباره سکوت میکنه \n <<<${first_name} @${username?username:"ریدم بهت که ایدی نداری"} >>>`)
            }else{
                await ctx.reply(`عزیزم درسته که قبلا تو سکوت بوده الان نیستش که میخوای درش بیاری`)
            }
            
        }else{
            await ctx.reply(`عزیزم این کاربر تا حالا تو سکوت نبوده که بخوای درش بیاری \n <<<${first_name} @${username?username:"ریدم بهت که ایدی نداری"} >>>`)
        }
        
    }
}
export default unmuteMember