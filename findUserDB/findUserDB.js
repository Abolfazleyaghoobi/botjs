import { TelegramUser } from "../models/User.model.js";

async function findUserDB(telegramId) {

    const resultFind=await TelegramUser.find({ telegramId});
    if (resultFind.length>0) {
        return resultFind;
    } else {
        return null;
        
    }

}

export default findUserDB;