const mongoose = require("mongoose");
const calenderschema = new mongoose.Schema({
    event_name:{
        type:String,
        required:true,
    },
    event_date:{
        type:String,
        required:true,
    },
    event_time:{
        type:String,
        required:true
    },
    event_description:{
        type:String,
        required:true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true 
    }

});
const  calendar = mongoose.model("calender",calenderschema);
module.exports=calendar;