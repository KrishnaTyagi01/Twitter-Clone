const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const User = require('../models/user');

const tweetSchema = new mongoose.Schema({
    postedBy:{
        type: ObjectId,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
   text:{
    type: String,
    required: true
   },
    photo:{
        type: String,
        default: ""
    },
    reply:[{
        text: String,
        postedBy: {type: ObjectId, ref: "User"}
      
    }],
    likes:[{
        type: ObjectId,
        ref: "User",
        default: ""
    }]
}, {timestamps: true})

module.exports = mongoose.model("Tweet", tweetSchema);