import express,{Response,Request, json} from "express";
import {z} from "zod";
import mongoose from "mongoose";
import { authMiddleware ,authenticatedRequest} from "../middlewares/authmiddleware";
import { contentModel} from "../db";
import { contentSchemavalidator,contenttype } from "../middlewares/contentvalidator";

const contentRouter=express.Router();


contentRouter.get("/contents",authMiddleware,async(req:authenticatedRequest,res:Response)=>{
    console.log("request reached get content route");
    const userId=req.userID;
    try{
        
        const result=await contentModel.find({
            userId: userId,
        }).populate("userId","email");
        res.status(200).json({
            data: result,
        })
        return;

    }catch(e){
        console.log(`error while creating content${e}`);
        res.status(500).json({
            message: "error while finding content",
        })
        return;
    }



})


contentRouter.post("/create-content",authMiddleware,contentSchemavalidator,async(req:authenticatedRequest,res:Response)=>{
    const userId=req.userID;
    const link=req.body.link;
    const title=req.body.title;
    const type=req.body.type;
    try{
        const result=await contentModel.create({
            title,
            link,
            type,
            userId: userId,
            tags: [],

        })
        res.json({
            created: true,
            message: "content added succefully to database",
        })
        return;

    }catch(error){
        console.log(`error while creating content${error}`);
        res.json({
            error: true,
            message: "error while creating content",
        })
        return;
    }

})
contentRouter.put("/delete-content",authMiddleware,async(req:authenticatedRequest,res:Response)=>{
    const contentId=req.body.contentId; 
    console.log(`request reached in delete route`);
    try{
        const result=await contentModel.deleteMany({
            _id: contentId,
            userId: req.userID,
        })
        res.json({
            message: "content is deleted",
            deleted: true,
        })
        return;

    }catch(err){
        console.log(`Error while deleting the contents${err}`);
        res.status(401).json({
            message: "error while deleting content",
        })

    }

})






export {contentRouter};