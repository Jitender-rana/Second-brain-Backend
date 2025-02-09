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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const content_1 = require("./routes/content");
const sharebrain_1 = require("./routes/sharebrain");
dotenv_1.default.config();
const port = process.env.PORT;
const url = process.env.URL;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.route("/*").get((req, res) => {
    res.json({
        status: "ok"
    });
});
app.use("/user", user_1.userRouter);
app.use("/content", content_1.contentRouter);
app.use("/brain", sharebrain_1.ShareBrainRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
        }
        catch (e) {
            console.log(`erro while connect to mongodb databasde ${e}`);
        }
    });
}
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
main();
