import { TelegramUser } from "../../models/User.model.js";

const sendGitAndStickerLimiter = async(chatId,userId,ctx,username,first_name)=>{
    const result = await TelegramUser.findOne({ telegramId: userId });
    await ctx.telegram.restrictChatMember(chatId, userId, { 
      permissions: {
        can_send_messages: result.permissions.can_send_messages, // پیام متنی آزاد
        can_send_audios: result.permissions.can_send_audios, // ❌ فایل صوتی ممنوع
        can_send_voice_notes: result.permissions.can_send_voice_notes, // ❌ وویس ممنوع
        can_send_video_notes: result.permissions.can_send_video_notes, // ویدیو نوت → اختیاری (اگه میخوای ببندی بگو)
        can_send_photos: result.permissions.can_send_photos,
        can_send_videos: result.permissions.can_send_videos,
        can_send_documents: result.permissions.can_send_documents, 
        can_send_other_messages: result.permissions.can_send_other_messages, 
        can_add_web_page_previews: result.permissions.can_add_web_page_previews,
      }, 
    });
    await ctx.reply(!result.permissions.can_send_other_messages?`این کاربر (@${username?username:"این بدبخت ایدی نداره "} نام=> ${first_name}) دیگه نمیتونه گیف و استیکر ارسال کنه و از فرستادن مدیا مانند فیلم عکس ازاده `:`این کاربر (@${username?username:"این بدبخت ایدی نداره "} نام=> ${first_name}) مجددا میتونه گیف و استیکر ارسال کنه و از فرستادن مدیا مانند فیلم عکس ازاده `);
}
export default sendGitAndStickerLimiter;