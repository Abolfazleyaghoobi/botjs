import { Markup } from "telegraf";

const backToPanel = async (ctx) => {
  const userID = ctx.from.id;
  const {username, first_name} = ctx.from;
  const ownerId = parseInt(ctx.match[1]);

  if (ctx.from.id !== ownerId) {
      await ctx.replyWithPhoto("https://uploadkon.ir/uploads/936a20_25pi.png",{
          caption:`این پنل ربات ماله تو نیست ${first_name}\n. برای اینکه بتونی پنل مربوط به خودت رو داشته باشی باید منو با اسم هایاتو صدا بزنی تا پنل مخصوص خودت رو بیارم .`,
      })
      return;
  }
  const id = 7763463127;
  const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
  const status = member.status;
  if (ctx.from.id === id) {
    await ctx.editMessageCaption(`سلام🥰\n چکار بلات انجام بدم`, {
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("لیست سکوت شده 🔇", `mutedList:${userID}`),
          Markup.button.callback("لیست بن شده ها⛔", `bannedList:${userID}`)
        ],
        [
          Markup.button.callback("امان نامه ها📜", "specialUsers"),
          Markup.button.callback("کاربران محدود شده", "limitUsers"),
        ],
        [    Markup.button.callback("بستن", "close")],
      ]),
    });
  } else if (status === "administrator" || status === "creator"||userID===7883847730) {
    await ctx.editMessageCaption(
      `چکار برات انجم بدم ${ctx.from.first_name} عزیز.\n لطفا یکی از گزینه زیر رو انتخاب کنید`,
      {
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback("لیست سکوت شده 🔇", `mutedList:${userID}`),
            Markup.button.callback("لیست بن شده ها⛔", `bannedList:${userID}`)
          ],
          [
            Markup.button.callback("امان نامه ها📜", "specialUsers"),
            Markup.button.callback("کاربران محدود شده", "limitUsers"),
          ],
          [    Markup.button.callback("بستن", "close")],
        ]),
      }
    );
  } else {
    await ctx.answerCbQuery(
      "❌ شما دسترسی لازم برای استفاده از این دکمه را ندارید.",
      { show_alert: true }
    );
  }
};
export default backToPanel;
