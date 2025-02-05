import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user";
import { contentRouter } from "./routes/content";
import { ShareBrainRouter } from "./routes/sharebrain";


dotenv.config();
const port=process.env.PORT;
const url=process.env.URL;
const app=express();
app.use(cors());
app.use(express.json());
// app.route("/*").get((req,res)=>{
//     res.json({
//         status: "ok"
//     })
// })
app.use("/user",userRouter);
app.use("/content",contentRouter);
app.use("/brain",ShareBrainRouter);


async function main(){
    try{
        await mongoose.connect(url!);

    }catch(e){
        console.log(`erro while connect to mongodb databasde ${e}`);
    }
}



app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})
main();