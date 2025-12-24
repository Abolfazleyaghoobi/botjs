import { TelegramUser } from "../models/User.model.js";
const chatIdgroup = process.env.CHAT_ID;
import { dirname } from "path";
import { join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
   
const start = async (ctx) => {
  const userID = ctx.from.id;  
  console.log(ctx.chat.id);
  
  const member = await ctx.telegram.getChatMember(chatIdgroup, userID);

  const status = member.status;
  console.log("status: ", status);  
  if (status !== "left") {
    console.log(12);
    if (status === "creator" || status === "administrator") {
        const result= await TelegramUser.findOne({telegramId:userID});  
        console.log('result: ', result);
        // get pic
          const photos = await ctx.telegram.getUserProfilePhotos(userID); 
          let fileId;
        //   get pic latest
          if (photos.total_count > 0) {
            fileId = photos.photos[0][0].file_id;
          }
          await ctx.replyWithPhoto(
            fileId || { source: join(__dirname, "../assets/img/noPic.jpg") },
            {
              caption: `
              ببین کی اینجاست قصه خور عالم عشق همه  بگو گلم چکار میخوای برات انجام بدم 

              
              
              
              `,
            }
          );
        } 
            // for simple member
        
        else {
          const photos = await ctx.telegram.getUserProfilePhotos(userID);
          let fileId;
          if (photos.total_count > 0) {
            fileId = photos.photos[0][0].file_id;
          }
          await ctx.replyWithPhoto(
            fileId || { source: join(__dirname, "../assets/img/noPic.jpg") },
            {
              caption: `🌟 سلام ${ctx.from.first_name}!
                  اینم عکس پروفایلت 😎`,
            }
          );
        }
    
  }
 //if the user is not the group
  else {
    const GROUP_INVITE_LINK = "https://t.me/testBotgroup_love";

await ctx.reply(
  `سلام! برای استفاده از ربات ابتدا عضو گروه شوید:\n` +
  `[عضویت در گروه](${GROUP_INVITE_LINK})`,
  { parse_mode: "Markdown" }
);

  }
}; 


































// {
//   // await ctx.reply("سلام خوبین شما!")
//   // const userInfo=await TelegramUser.findOne({telegramID:ctx.from.id});
//   // // console.log('userInfo: ', userInfo);
//   // if (!userInfo) {
//   //     await ctx.reply("شما اد")
//   //     return
//   // }
// }
export default start;
