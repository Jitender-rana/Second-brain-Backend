"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userdatavalidator = userdatavalidator;
const zod_1 = require("zod");
const myschema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(1, { message: "Password must be atleast of 1 characters" }),
});
function userdatavalidator(req, res, next) {
    try {
        console.log(req.body.email);
        req.body = myschema.parse(req.body);
        next();
    }
    catch (error) {
        console.log("There is some error while handling user data");
        if (error instanceof zod_1.z.ZodError) {
            console.log(`the error is :  ${error.errors[0].message}`);
            res.json({
                message: "validation error",
                error: error.errors[0].message,
            });
            return;
        }
        res.status(500).json({
            message: "unexpected error occured while parsing"
        });
        return;
    }
}
