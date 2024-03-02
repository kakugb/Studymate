const express = require("express");
const router = express.Router();
const Grade = require("../Models/grade");
const User = require("../Models/user");



// add a session route 
router.post("/add-grade", async (req,res) => {
    try{
        const {course_name,grades_data,calculated_grade,user_id} = req.body;
        const checkuser = await  User.findById({_id:user_id});
        if(!checkuser){
            return res.status(401).json({"message":"User Not Found"});
        }
        const grade = new Grade({
            "course_name":course_name,
           "grades_data":grades_data,
           "calculated_grade":calculated_grade,
            "user_id":user_id,
        })
        await grade.save();
        res.status(200).json({"message":"Grade Assign SuccessFully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});


// get all grade route 
router.get('/all-grades', async (req,res) => {
    try{

    const grade_data = await Grade.find().populate('user_id','user_name');
    res.status(200).json(grade_data);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({"messgae":"Internal Server"});
    }
});

// Delete grade route 

router.delete("/delete-grade/:id", async (req,res) => {
    try {
        const gradeid = req.params.id;
        const  deletegrade = await Grade.findById({_id:gradeid});
        if (!deletegrade){
            return  res.status(401).json({"message":"Grade not Found"});
        }
        await Grade.findByIdAndDelete(deletegrade);
        res.status(200).json({"message":"Grade Deleted SuccessFully"});
    }
    catch (error)
    {
        console.log(error);
    };
});

// get grade by id 
router.get("/get-grade/:id",async (req,res) => {
    try{
        const gradeid = req.params.id;
        const showgrade = await Grade.findById({_id:gradeid});
        if(!showgrade){
            return res.status(401).json({"message":"Id not Found"});
        }
        res.status(200).json(showgrade);

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});

  // update grade route 
  router.put("/update-grade/:id",async (req,res) => {
    try{
        const gradeid = req.params.id;
        const updatedgradedata = req.body;
        const checkid = await Grade.findById(gradeid);
        if(!checkid){
           return  res.status(404).json({"message":"Not found"});
        }
        await Grade.findByIdAndUpdate(checkid,updatedgradedata);
        res.status(200).json({"message":"Grades Updated Successfully"});
    }
    catch(error){
        console.log();
        res.status(500).json({"message": "Internal server Error"});
    }
   });
module.exports = router;