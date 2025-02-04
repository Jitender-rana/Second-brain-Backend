import { Request,Response,NextFunction } from "express";
import {string, z} from "zod";

const contentSchema=z.object({
    title: z.string().min(1,{message: "title for content is required"}),
    link: z.string().min(1,{message: "link for content is required"}).url({message: "Invalid url for the resource"}),
    type: z.string(),
})
type contenttype=z.infer<typeof contentSchema>;

function contentSchemavalidator(req: Request,res:Response,next: NextFunction){
    try{
        req.body=contentSchema.parse(req.body);
        // console.log("in todo validator middleware the data is: "+req.body)
        next();

    }catch(err){
        console.log("error while handling the todo data sent by user",err);
        if(err instanceof z.ZodError){
            res.json({
                message: "inavalid data sent by user",
                error: err.errors[0].message,
            })
        }
        res.json({
            message: "unexpected error occurred while handling to-do data",
        })

    }

}
export {contentSchemavalidator, contenttype};