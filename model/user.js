const mongoose = require("mongoose")
const  array  = require("prop-types")

const userSchema = new mongoose.Schema({
    email:{
        type: String
    },
    password: {
        type: String
    },
    list:{
       type: { type : Array , "default" : [] }
    }
}, {timestamps: true});
module.export = mongoose.model("User",userSchema);