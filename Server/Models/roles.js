const mongoose = require("mongoose");
const roleschema = new mongoose.Schema({
    role_name:{ 
            type: String,
            required: true,
            unique:true
         },
});
const role = mongoose.model("role" , roleschema);
module.exports = role;