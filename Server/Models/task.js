const mongoose = require("mongoose");
const taskschema = new mongoose.Schema({

    task_name:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        enum:["First" , "Second"],
        default:"First",
        required:true,
    },
    deadline:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Compeleted","Incompleted","pending"],
        default:"pending"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    group_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"collaboration_group",
        required: true
    }   
});
const task =  mongoose.model("task",taskschema);
module.exports=task;
