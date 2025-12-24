import mongoose from "mongoose";
import { permissionSchema } from "./PermissionModel.js";

const userSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
  
  },
  first_name: {
    type: String,

  },
  username: {
    type: String,
    default: null,
  }, 
  nickName:{
    type:String,
    default:null,
  },
  levelUser: {
    type: [String],
    default: ["member","Anonymous"],
  },
  isBan: {
    type: Boolean,
    default: false,
  },
  isMute: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: permissionSchema,
    default: () => ({}),
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const TelegramUser = mongoose.model("user", userSchema);

