import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("connect to db")
)
.catch((e)=>console.log(e))  


