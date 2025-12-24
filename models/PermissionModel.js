import mongoose from "mongoose";

export const permissionSchema = new mongoose.Schema({
  can_send_messages: { type: Boolean, default: true },
  can_send_audios: { type: Boolean, default: true },
  can_send_documents: { type: Boolean, default: true },
  can_send_photos: { type: Boolean, default: true },
  can_send_videos: { type: Boolean, default: true },
  can_send_video_notes: { type: Boolean, default: true },
  can_send_voice_notes: { type: Boolean, default: true },
  can_send_polls: { type: Boolean, default: true },
  can_send_other_messages: { type: Boolean, default: true },
  can_add_web_page_previews: { type: Boolean, default: true },
  
  can_invite_users: { type: Boolean, default: true },
  can_pin_messages: { type: Boolean, default: true },
  can_manage_topics: { type: Boolean, default: true },
});
