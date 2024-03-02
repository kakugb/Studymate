const express = require("express");
const router = express.Router();
const Assesment = require("../Models/assesment");
const User = require("../Models/user");


// add a assesment route 
router.post("/add-assesment", async (req,res) => {
    try{
        const {assesment_name,assesment_result,user_id} = req.body;
        const checkuser = await  User.findById({_id:user_id});
        if(!checkuser){
            return res.status(401).json({"message":"User Not Found"});
        }
        const assesment = new Assesment({
            "assesment_name":assesment_name,
            "assesment_result":assesment_result,
            "user_id":user_id,
        })
        await assesment.save();
        res.status(200).json({"message":"Assesment Graded SuccessFully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});

// get all assesment route 

router.get('/all-assesments', async (req,res) => {
    try{

    const assesment_data = await Assesment.find().populate('user_id','user_name');
    res.status(200).json(assesment_data);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({"messgae":"Internal Server"});
    }
});

// Delete assesment route 

router.delete("/delete-assesment/:id", async (req,res) => {
    try {
        const assesmentid = req.params.id;
        const  deleteassesment = await Assesment.findById({_id:assesmentid});
        if (!deleteassesment){
            return  res.status(401).json({"message":"Assesment not Foundd"});
        }
        await Assesment.findByIdAndDelete(deleteassesment);
        res.status(200).json({"message":"Assesment Deleted SuccessFully"});
    }
    catch (error)
    {
        console.log(error);
    };
});

// get data by id 
router.get("/get-assesment/:id",async (req,res) => {
    try{
        const assesmentid = req.params.id;
        const showassesment = await Assesment.findById({_id:assesmentid});
        if(!showassesment){
            return res.status(401).json({"message":"Id not Found"});
        }
        res.status(200).json(showassesment);

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});

    // update assesment route 
   router.put("/update-assesment/:id",async (req,res) => {
    try{
        const assesmentid = req.params.id;
        const updatedassesmentdata = req.body;
        const checkid = await Assesment.findById(assesmentid);
        if(!checkid){
           return  res.status(404).json({"message":"Assesment Not found"});
        }
        await Assesment.findByIdAndUpdate(checkid,updatedassesmentdata);
        res.status(200).json({"message":"Assesment Updated Successfully"});
    }
    catch(error){
        console.log();
        res.status(500).json({"message": "Internal server Error"});
    }
   });
   
module.exports = router;