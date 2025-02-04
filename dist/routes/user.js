"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const uservalidator_1 = require("../middlewares/uservalidator");
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const JWt_SECRET = process.env.JWT_SECRET || "defaultsecret";
const saltrounds = parseInt(process.env.SALTROUND || "2");
userRouter.post("/signup", uservalidator_1.userdatavalidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield db_1.userModel.findOne({
        email: data.email,
    });
    if (result) {
        res.json({
            exist: "true",
            message: "User with this email already exist",
        });
        return;
    }
    else {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(data.password, saltrounds);
            const user = yield db_1.userModel.create({
                email: data.email,
                password: hashedPassword,
            });
            res.json({
                message: "You have signed up",
                data: user,
            });
            return;
        }
        catch (error) {
            console.log("error while creating user");
            res.status(201).json({
                message: "You have signed up",
            });
            return;
        }
    }
}));
userRouter.post("/signin", uservalidator_1.userdatavalidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield db_1.userModel.findOne({
            email: data.email,
        });
        if (result) {
            const isValidPassword = yield bcrypt_1.default.compare(data.password, result.password);
            if (isValidPassword) {
                const token = jsonwebtoken_1.default.sign({ id: result._id }, JWt_SECRET);
                res.status(200).json({
                    token: token,
                    message: "You have signed in succesfully"
                });
                return;
            }
            else {
                res.json({
                    wrongpassword: true,
                    message: "Wrong password try again!"
                });
                return;
            }
        }
        else {
            res.json({
                wrongemail: true,
                message: "Invalid email or password , first signup",
            });
            return;
        }
    }
    catch (error) {
        console.log(`error while finding user in signin`);
        res.status(401).json({
            message: "error while finding user in signin",
        });
        return;
    }
}));
