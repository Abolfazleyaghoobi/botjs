import banMember from "../Chat Membe MNG/banMember.js";
import muteMember from "../Chat Membe MNG/muteMember.js";   
import { upgradeLock } from "../Chat Membe MNG/upgradeMember.js";

import unbanMember from "../Chat Membe MNG/unbanMember.js";  
import unmuteMember from "../Chat Membe MNG/unmuteMember.js";
import helpBot from "../help/help.js";

import limiter from "../menu/Limiter..js";
import panel from "../menu/Panel.js";
import upgrageMember from "../Chat Membe MNG/upgradeMember.js";
import unupgrade from "../actions/unupgrade/unupgrade.js";
import { ali } from "../actions/upgrade/specialPromotion.js";
// 8060165800

const text = async (ctx) => {
  const text = ctx.message.text; 
  if (upgradeLock.isNickName&&upgradeLock.adminId===ctx.from.id) {
    ali(ctx)
    // console.log("text lock: ", text);
    return;
    
  }
  // console.log('text: ', text); 
  // console.log(ctx.chat.id);    
  if (text === "هایاتو") {
    panel(ctx);
  } else if (text === "محدود") {
    limiter(ctx);
  } else if (text === "بن") {
    banMember(ctx);
  } else if (text === "آنبن" || text === "انبن") {
    unbanMember(ctx); 
  } else if (text === "سکوت") {
    muteMember(ctx); 
  } else if (text === "آنسکوت" || text === "انسکوت") { 
    unmuteMember(ctx);
  }else  if(text==="راهنما"){
   helpBot(ctx) 

  }else if (text==="ارتقا") {
    upgrageMember(ctx)
  }else if(text=="گرفتن"){
    unupgrade(ctx)
  }


  
};
export default text;
