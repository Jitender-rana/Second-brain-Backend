import express, { Request,Response,NextFunction } from "express";
import {z} from "zod";


const myschema=z.object({
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().min(1,{message: "Password must be atleast of 1 characters"}),

})

type userPayloadSchema=z.infer<typeof myschema>;

function userdatavalidator(req: Request,res: Response,next:NextFunction){
    try{
        console.log(req.body.email);
        req.body=myschema.parse(req.body);
        next();

    }catch(error){
        console.log("There is some error while handling user data");
        if(error instanceof z.ZodError){
            console.log(`the error is :  ${error.errors[0].message}`);
            res.json({
                message: "validation error",
                error: error.errors[0].message,
            })
            return;

        }
        res.status(500).json({
            message:   "unexpected error occured while parsing" 
        })
        return;


    }
}
export {userdatavalidator,userPayloadSchema};