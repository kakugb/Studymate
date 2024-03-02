const mongoose = require("mongoose");
const groupschema = new mongoose.Schema({

    group_name:{
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    } 
});
const group = mongoose.model("collaboration_group" , groupschema);
module.exports = group;

