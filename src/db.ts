import mongoose , {model}from "mongoose";
const schema =mongoose.Schema;
const userSchema=new schema({
    email: {type: String,unique: true},
    password: String
})

const contentSchema=new schema({
    title: String,
    link: String,
    type: String,
    tags: [{type: schema.Types.ObjectId,ref: 'tags'}],
    userId: {type: schema.Types.ObjectId,ref:  'users'}
})
const linkSchema=new schema({
    hash: String,
    userId: {type: schema.Types.ObjectId,ref: 'users',unique: true, required: true},
})
const tagsSchema=new schema({
    title: String,
})

const userModel=model("users",userSchema);
const contentModel=model("content",contentSchema);
const linkModel=model("link",linkSchema);
const tagsModel=model("tags",tagsSchema);
export {userModel,contentModel,linkModel,tagsModel};