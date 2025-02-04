import express,{Response,Request, json} from "express";
import { userdatavalidator, userPayloadSchema } from "../middlewares/uservalidator";
import { userModel } from "../db";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const userRouter=express.Router();

const JWt_SECRET=process.env.JWT_SECRET||"defaultsecret";
const saltrounds=parseInt(process.env.SALTROUND || "2");




userRouter.post("/signup",userdatavalidator,async(req: Request,res: Response)=>{
    const data: userPayloadSchema= req.body;
    const result=await userModel.findOne({
        email:data.email,
    })
    if(result){
        res.json({
            exist: "true",
            message: "User with this email already exist",
        })
        return;
    }else{
        try{
            
            const hashedPassword=await bcrypt.hash(data.password,saltrounds);
            const user=await userModel.create({
                email: data.email,
                password: hashedPassword,

            })
            res.json({
                message: "You have signed up",
                data: user,
            })
            return 
        }catch(error){
            console.log("error while creating user");
            res.status(201).json({
                message: "You have signed up",
            })
            return;
            

        }
    }
})


userRouter.post("/signin",userdatavalidator,async(req:Request,res: Response)=>{
    const data:userPayloadSchema=req.body;
    try{
        const result =await userModel.findOne({
        email:data.email,
    })
    if(result){
        const isValidPassword=await bcrypt.compare(data.password,result.password!);

        if(isValidPassword){
            const token=jwt.sign({id: result._id},JWt_SECRET!);
            res.status(200).json({
                token: token,
                message: "You have signed in succesfully"

            })
            return;


        }else{
            res.json({
                wrongpassword: true,
                message: "Wrong password try again!"
            })
            return;
        }


    }else{
        res.json({
            wrongemail: true,
            message: "Invalid email or password , first signup",
        })
        return;
    }



    }catch(error){
            console.log(`error while finding user in signin`);
            res.status(401).json({
                message: "error while finding user in signin",
            })
            return;

    }
})





export {userRouter};



