const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    user_name:{ 
            type: String,
            required: true,
         },
    email_address:{ 
            type: String,
            required: true,
         },
    password:{ 
            type: String,
            required: true,
         },
         role:{
            type: String,
            required: true
         }
});
const user = mongoose.model("user" , userschema);
module.exports = user;