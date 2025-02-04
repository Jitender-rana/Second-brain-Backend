import express, {Request,Response} from "express";
import { authenticatedRequest, authMiddleware } from "../middlewares/authmiddleware";
import { contentModel, linkModel } from "../db";
import { userModel } from "../db";

const ShareBrainRouter=express.Router();
ShareBrainRouter.post("/share",authMiddleware,async(req:authenticatedRequest,res:Response)=>{
    const share: boolean=req.body.share;
    if(share){
        try{
        const existinglink=await linkModel.findOne({
            userId: req.userID,
        });
        if(existinglink){
            console.log(`hash is: ${existinglink.hash}`)
            res.json({
                hash: existinglink.hash,
                message: "Link already exists",
            })
            return 
        }
        function random(len: number) {
            let options = "qwertyuioasdfghjklzxcvbnm12345678";
            let length = options.length;
        
            let ans = "";
        
            for (let i = 0; i < len; i++) {
                ans += options[Math.floor((Math.random() * length))] // 0 => 20
            }
        
            return ans;
        }
        const hash=random(10);
        const newlink=await linkModel.create({
            userId: req.userID,
            hash: hash,
        })
        res.json({
            hash: newlink,
        })
    }catch(err){
        console.log("error while  creating link"+err);
        res.json({
            error: true,
            message: "Error while creating link",
        })
        return;
    }
    }else{
        try{
        const result=await linkModel.deleteOne({
            userId: req.userID,
        })
        res.json({
            message: "link removed successfully",
        })
        return;
       }catch(err){
        console.log("error while deleting link"+err);
        res.json({
            message: "error while deleting the sharable link"
        })
        return;
       }
   }

})


ShareBrainRouter.get("/:shareLink",async(req:Request,res:Response)=>{
    try{
        console.log(`request reached share brain route`);
        
        const link=req.params.shareLink;
        console.log(link);
        const resLink=link.replace(":","");
        const result=await linkModel.findOne({
            hash: resLink,
        })
        if(!result){
            res.json({
                message: "link not found, wrong input",
            })
            return;
        }
        const user=result.userId;
        const  userResult=await userModel.findOne({
            _id: user,
        })
        const contentResult= await contentModel.find({
            userId: user,
        })
        if(!userResult){
            res.json({
                message: "user do not exist for this link",
            })
            return;
        }
        res.json({
            data: contentResult,
            user: userResult.email,
        })
        return;

    }catch(err){
        console.log("error while getting link(outer try catch)"+err);
    }

})

export {ShareBrainRouter};