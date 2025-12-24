import { Markup } from "telegraf";
import { TelegramUser } from "../models/User.model.js";

const muteList = async (ctx)=>{
    const ownerId = parseInt(ctx.match[1]);
 
    const {username, first_name} = ctx.from;
    if (ctx.from.id !== ownerId) {
        await ctx.replyWithPhoto("https://uploadkon.ir/uploads/3b9216_25gpt-image-1-a-The-ureter-should-ha.png",{
            
            caption:`این پنل ربات ماله تو نیست ${first_name}\n. برای اینکه بتونی پنل مربوط به خودت رو داشته باشی باید منو با اسم هایاتو صدا بزنی تا پنل مخصوص خودت رو بیارم .`,
        })
        return; 
    }
 try {
 
        const result= await TelegramUser.find()
        const mutedUsers = result.filter(user => user.isMute== true);
        if (mutedUsers.length == 0) {
            await ctx.editMessageCaption("هیچ کاربری سکوت نشده است.",{
                ...Markup.inlineKeyboard([
                    [
                        Markup.button.callback("بازگشت به پنل مدیریت", `backToPanel:${ctx.from.id}`)
                    ]
                ])
            });
            return;
        } 
        let text = "🔇 *لیست کاربران در حالت سکوت:*\n\n";
        mutedUsers.forEach((user, index) => {
          text += `${index + 1}. ${`@${user.username}`||"خرمگس ایدی نداره"} ( ${user.first_name})\n`;
        });
        await ctx.editMessageCaption(text,{
            parse_mode: "Markdown",
            ...Markup.inlineKeyboard([
                [
                    Markup.button.callback("بازگشت به پنل مدیریت", `backToPanel:${ctx.from.id}`)
                ]
            ])
        });
    } catch (error) {
        console.log('error: ', error.message);
        
    }
}
export default muteList;