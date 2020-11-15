const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "https://res.cloudinary.com/krishnatyagi12/image/upload/v1605277906/no-user-image_uwczsr.gif"
    },
    followers: [{type: ObjectId, ref: "User"}],
    following: [{type: ObjectId, ref: "User"}]
})

mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);