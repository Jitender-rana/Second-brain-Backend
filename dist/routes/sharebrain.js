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
exports.ShareBrainRouter = void 0;
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middlewares/authmiddleware");
const db_1 = require("../db");
const db_2 = require("../db");
const ShareBrainRouter = express_1.default.Router();
exports.ShareBrainRouter = ShareBrainRouter;
ShareBrainRouter.post("/share", authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        try {
            const existinglink = yield db_1.linkModel.findOne({
                userId: req.userID,
            });
            if (existinglink) {
                console.log(`hash is: ${existinglink.hash}`);
                res.json({
                    hash: existinglink.hash,
                    message: "Link already exists",
                });
                return;
            }
            function random(len) {
                let options = "qwertyuioasdfghjklzxcvbnm12345678";
                let length = options.length;
                let ans = "";
                for (let i = 0; i < len; i++) {
                    ans += options[Math.floor((Math.random() * length))]; // 0 => 20
                }
                return ans;
            }
            const hash = random(10);
            const newlink = yield db_1.linkModel.create({
                userId: req.userID,
                hash: hash,
            });
            res.json({
                hash: newlink,
            });
        }
        catch (err) {
            console.log("error while  creating link" + err);
            res.json({
                error: true,
                message: "Error while creating link",
            });
            return;
        }
    }
    else {
        try {
            const result = yield db_1.linkModel.deleteOne({
                userId: req.userID,
            });
            res.json({
                message: "link removed successfully",
            });
            return;
        }
        catch (err) {
            console.log("error while deleting link" + err);
            res.json({
                message: "error while deleting the sharable link"
            });
            return;
        }
    }
}));
ShareBrainRouter.get("/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`request reached share brain route`);
        const link = req.params.shareLink;
        console.log(link);
        const resLink = link.replace(":", "");
        const result = yield db_1.linkModel.findOne({
            hash: resLink,
        });
        if (!result) {
            res.json({
                message: "link not found, wrong input",
            });
            return;
        }
        const user = result.userId;
        const userResult = yield db_2.userModel.findOne({
            _id: user,
        });
        const contentResult = yield db_1.contentModel.find({
            userId: user,
        });
        if (!userResult) {
            res.json({
                message: "user do not exist for this link",
            });
            return;
        }
        res.json({
            data: contentResult,
            user: userResult.email,
        });
        return;
    }
    catch (err) {
        console.log("error while getting link(outer try catch)" + err);
    }
}));
