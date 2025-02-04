"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsModel = exports.linkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const schema = mongoose_1.default.Schema;
const userSchema = new schema({
    email: { type: String, unique: true },
    password: String
});
const contentSchema = new schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: schema.Types.ObjectId, ref: 'users' }
});
const linkSchema = new schema({
    hash: String,
    userId: { type: schema.Types.ObjectId, ref: 'users', unique: true, required: true },
});
const tagsSchema = new schema({
    title: String,
});
const userModel = (0, mongoose_1.model)("users", userSchema);
exports.userModel = userModel;
const contentModel = (0, mongoose_1.model)("content", contentSchema);
exports.contentModel = contentModel;
const linkModel = (0, mongoose_1.model)("link", linkSchema);
exports.linkModel = linkModel;
const tagsModel = (0, mongoose_1.model)("tags", tagsSchema);
exports.tagsModel = tagsModel;
