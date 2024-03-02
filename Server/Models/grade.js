const mongoose = require("mongoose");
const gradeschema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true,
    },
    grades_data:{
        type:String,
        required:true,
    },
    calculated_grade:{
        type:String,
        required:true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true 
    }

});
const  grade = mongoose.model("grade",gradeschema);
module.exports=grade;