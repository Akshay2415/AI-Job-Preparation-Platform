const mongoose = require("mongoose")

const tokenblacklistSchema = new mongoose.Schema({
    token : {
        type : String,
        require :[true,"Token is required"]
    }
},{
    timestamps:true
})

const tokenblacklistModel= mongoose.model("blacklist",tokenblacklistSchema);

module.exports =tokenblacklistModel;