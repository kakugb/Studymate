const mongoose = require("mongoose");
const sessionschema = new mongoose.Schema({
    session_name:{
        type:String,
        required:true,
    },
    start_time:{
        type:String,
        required:true,
    },
    end_time:{
        type:String,
        required:true
    },
    progress:{
        type:String,
        required:true
    },
    materials:{
        type:String,
        required:true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true 
    }

});
const  session = mongoose.model("session",sessionschema);
module.exports=session;