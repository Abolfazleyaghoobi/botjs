import isAdmin from "../isAdmin/isAdmin.js";

const helpBot = async (ctx) => {
  const chatId = process.env.CHAT_ID;
  const userID = ctx;
  const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
  const status = member.status;

  //   console.log('status: ', status);
  if (isAdmin(status)) {
    await ctx.replyWithPhoto(
      'https://uploadkon.ir/uploads/a5ca16_25gpt-image-1-a-Her-face-should-be-s.png',
      {
        reply_to_message_id: ctx.message.message_id,
        parse_mode: "HTML",
        caption: `\u200fسلام ${userID.from.first_name || userID.from.username} 🥰👋
    ✨ خوش اومدی!
    راهنمای کامل دستورات رو پایین می‌فرستم 👇`
      }
    );
    
    await ctx.reply(
    `\u200f<b>📘 راهنمای دستورات مدیریتی</b>
    
    <b>1️⃣ محدود کردن</b>
    ➤ <code>محدود</code>
    🔹 روی پیام کاربر ریپلای کن
    
    <b>2️⃣ بن / آنبن</b>
    ➤ <code>بن</code> | <code>انبن</code>
    🔹 روی پیام کاربر ریپلای کن
    
    <b>3️⃣ امان‌نامه 🛡️</b>
    ➤ <code>امان نامه</code>
    🔹 روی پیام کاربر ریپلای کن
    
    <b>4️⃣ سکوت 🔇</b>
    ➤ <code>سکوت</code> | <code>انسکوت</code>
    🔹 روی پیام کاربر ریپلای کن
    `,
    {
      reply_to_message_id: ctx.message.message_id,
      parse_mode: "HTML",
    });
    



    // await ctx.reply("ali")
  } else {
      await ctx.replyWithPhoto(
        "https://uploadkon.ir/uploads/623216_25gpt-image-1-a-Her-face-is-frowning.png",
        {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
          caption:"\u200f توکه مدیری نیستی 😒😑"
        }
      )
  }
};
export default helpBot;
