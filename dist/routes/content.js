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
exports.contentRouter = void 0;
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middlewares/authmiddleware");
const db_1 = require("../db");
const contentvalidator_1 = require("../middlewares/contentvalidator");
const contentRouter = express_1.default.Router();
exports.contentRouter = contentRouter;
contentRouter.get("/contents", authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request reached get content route");
    const userId = req.userID;
    try {
        const result = yield db_1.contentModel.find({
            userId: userId,
        }).populate("userId", "email");
        res.status(200).json({
            data: result,
        });
        return;
    }
    catch (e) {
        console.log(`error while creating content${e}`);
        res.status(500).json({
            message: "error while finding content",
        });
        return;
    }
}));
contentRouter.post("/create-content", authmiddleware_1.authMiddleware, contentvalidator_1.contentSchemavalidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userID;
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    try {
        const result = yield db_1.contentModel.create({
            title,
            link,
            type,
            userId: userId,
            tags: [],
        });
        res.json({
            created: true,
            message: "content added succefully to database",
        });
        return;
    }
    catch (error) {
        console.log(`error while creating content${error}`);
        res.json({
            error: true,
            message: "error while creating content",
        });
        return;
    }
}));
contentRouter.put("/delete-content", authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    console.log(`request reached in delete route`);
    try {
        const result = yield db_1.contentModel.deleteMany({
            _id: contentId,
            userId: req.userID,
        });
        res.json({
            message: "content is deleted",
            deleted: true,
        });
        return;
    }
    catch (err) {
        console.log(`Error while deleting the contents${err}`);
        res.status(401).json({
            message: "error while deleting content",
        });
    }
}));
