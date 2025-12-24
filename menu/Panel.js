

import { Markup } from "telegraf";





const panel=async (ctx)=>{
  // const chatId = process.env.CHAT_ID;
  const chatId = ctx.chat.id;

    const userID = ctx.from.id;
 
    const member = await ctx.telegram.getChatMember(chatId, ctx.from.id);
    const text = ctx.message.text;
  
    const status = member.status; 
   
    
  // 7763463127 rahineh
    if (status === "creator" || status === "administrator") {
      if (text === "هایاتو") {

        if (ctx.from.id == 7763463127) {
   
          // send response 
          await ctx.replyWithPhoto(
           "https://uploadkon.ir/uploads/550116_25Gemini-Generated-Image-okmkihokmkihokmk.png",
            {
              reply_to_message_id: ctx.message.message_id,
              parse_mode: "HTML",
              caption: `سلام🥰\n چکار بلات انجام بدم`,
              ...Markup.inlineKeyboard([
                [
                  Markup.button.callback("لیست سکوت شده 🔇", `mutedList:${userID}`),
                  Markup.button.callback("لیست بن شده ها⛔", `bannedList:${userID}`)
                ],
                [
                  Markup.button.callback("امان نامه ها📜", "specialUsers"),

                  Markup.button.callback("کاربران محدود شده", "limitUsers")
                ],
                [
                  Markup.button.callback("بستن", "close")
                ]
              ]),
            }
          );
        }
        //! if is not setaish
         else if (ctx.from.id !== 7763463127) {
          console.log(991);
          // get pic
          const photos = await ctx.telegram.getUserProfilePhotos(ctx.from.id);
          console.log('photos: ', photos);
          let fileId;
          // //   get pic latest
          if (photos.total_count > 0) {
            fileId = photos.photos[0][0].file_id;
          }
       
          // // send response
          await ctx.replyWithPhoto( 
            "https://uploadkon.ir/uploads/849016_25gpt-image-1-a-It-should-be-an-anim.png",
            {
              reply_to_message_id: ctx.message.message_id,
              parse_mode: "HTML",
              caption: `چکار برات انجم بدم ${ctx.from.first_name} عزیز.\n لطفا یکی از گزینه زیر رو انتخاب کن`,
              ...Markup.inlineKeyboard([
                [
                  Markup.button.callback("لیست سکوت شده 🔇", `mutedList:${userID}`),
                  Markup.button.callback("لیست بن شده ها⛔", `bannedList:${userID}`)
                ],
                [
                  Markup.button.callback("امان نامه ها📜", "specialUsers"),
                  Markup.button.callback("کاربران محدود شده", "limitUsers")
                ],
                [
                  Markup.button.callback("بستن", "close")
                ]
              ]),
            }
          );
          // await ctx.reply("ali") 
        }
      }
    } else {
      await ctx.replyWithPhoto(
       "https://uploadkon.ir/uploads/623216_25gpt-image-1-a-Her-face-is-frowning.png",
        {
          reply_to_message_id: ctx.message.message_id,
          caption: `تو مدیر من نیسیتی بم بم جان 😒😑`,
        }
      );
    }
}
export default panel;