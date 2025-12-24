import { TelegramUser } from "../../models/User.model.js";
// const until = Math.floor(Date.now() / 1000) + 60;
const sendVideoPhoto = async (chatId, userId, ctx, username,first_name) => {
  console.log("userId: ", userId);
  console.log("chatId: ", chatId);

  const result = await TelegramUser.findOne({ telegramId: userId });
  console.log(result.permissions.can_send_messages);
  await ctx.telegram.restrictChatMember(chatId, userId, {
    permissions: {
      can_send_messages: true,

      can_send_media_messages: result.permissions.can_invite_users,

      can_send_polls: result.permissions.can_invite_users,
      can_send_other_messages: result.permissions.can_invite_users,
      can_add_web_page_previews: result.permissions.can_invite_users,
      can_change_info: result.permissions.can_invite_users,
      can_invite_users: result.permissions.can_invite_users,
      can_pin_messages: result.permissions.can_pin_messages,
    },
  });
 await ctx.reply(!result.permissions.can_invite_users?`کاربر با ایدی (@${username?username:"معلومول حا پدر کوسه مادر هشتپاه چرا ایدی نداری؟"}) و با نام (${first_name}) از ارسال فیلم عکس اسناد مانند پی دی اف و از ارسال وویس و استیکر و گیف هم محروم شدید`:`کاربر با ایدی (@${username?username:"معلومول حا پدر کوسه مادر هشتپاه چرا ایدی نداری؟"}) و با نام (${first_name}) مجددا میتوانید فیلم عکس اسناد مانند پی دی اف ,  وویس , استیکر و گیف  هم ارسال کنید`);
};
export default sendVideoPhoto;
