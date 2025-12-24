import mongoose from "mongoose";

const badWordSchema = new mongoose.Schema({
  badWord: [
    {
      word: {
        type: String,
        unique: true,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

export default badWordList = mongoose.model("BadWord", badWordSchema);
