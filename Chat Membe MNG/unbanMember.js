import { TelegramUser } from "../models/User.model.js";


const unbanMember = async (ctx) => {
  const chatId = process.env.CHAT_ID;
  const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
  const text = ctx.message.text;

  const status = member.status;
  if (status === "creator" || status === "administrator") {
    const replyUser = ctx.message.reply_to_message;

    if (!replyUser) {
      return ctx.reply("روی پیام کاربر ریپلای کن که تا از بن بودن بکمش بیرون.");
    }
    const { id, first_name, username } = replyUser.from;

    // const chatId = ctx.chat.id;
    const result = await TelegramUser.findOne({ telegramId: id });
    if (result) {
      if (result.isBan) {
        await TelegramUser.findOneAndUpdate({ telegramId: id }, { isBan: false });
      await ctx.telegram.unbanChatMember(chatId, id);
      await ctx.reply(`بدبخت بیا دلشون, برات سوخت از بن در اوردنت \n @${username?username:"ادیمزار حد اقل ایدی مزاشتی"}\n اسمت ${first_name}`);
      }else{
        await ctx.reply(`این ${first_name} بدبخت قبلا تو لیست بن شده ها بوده الان نیست که میخوایی دوباره بنش کنی؟😁😁😁`)
      }
    } else {
        await ctx.reply(`بچه خوبه اسمش(${first_name})\n توقسمت بن شده ها نیست `)

    }
  }
};
export default unbanMember;
