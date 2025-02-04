"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentSchemavalidator = contentSchemavalidator;
const zod_1 = require("zod");
const contentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "title for content is required" }),
    link: zod_1.z.string().min(1, { message: "link for content is required" }).url({ message: "Invalid url for the resource" }),
    type: zod_1.z.string(),
});
function contentSchemavalidator(req, res, next) {
    try {
        req.body = contentSchema.parse(req.body);
        // console.log("in todo validator middleware the data is: "+req.body)
        next();
    }
    catch (err) {
        console.log("error while handling the todo data sent by user", err);
        if (err instanceof zod_1.z.ZodError) {
            res.json({
                message: "inavalid data sent by user",
                error: err.errors[0].message,
            });
        }
        res.json({
            message: "unexpected error occurred while handling to-do data",
        });
    }
}
