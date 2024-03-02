const express = require("express");
const router = express.Router();
const role = require('../Models/roles');
router.post("/addrole" , async (req,res) => {
    try{
        const{role_name} = req.body;
        const newrole = new role({
            role_name,
        });
        await newrole.save() ;
        res.status(201).json({"message": "Role Added Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message": "Internale Server Error"});
    }
});

module.exports = router;