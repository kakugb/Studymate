const mongoose = require("mongoose");
const assesmentschema = new mongoose.Schema({
    assesment_name:{
        type:String,
        required:true
    },
    assesment_result:{
        type:String,
        required:true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

});
const assesment = mongoose.model("assesment",assesmentschema);
module.exports = assesment;