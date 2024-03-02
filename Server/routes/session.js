const express = require("express");
const router = express.Router();
const Session = require("../Models/session");
const User = require("../Models/user");


// add a session route 
router.post("/add-session", async (req,res) => {
    try{
        const {session_name,start_time,end_time,progress,materials,user_id} = req.body;
        const checkuser = await  User.findById({_id:user_id});
        if(!checkuser){
            return res.status(401).json({"message":"User Not Found"});
        }
        const session = new Session({
            "session_name":session_name,
           "start_time":start_time,
           "end_time":end_time,
           "progress": progress,
           "materials": materials,
            "user_id":user_id,
        })
        await session.save();
        res.status(200).json({"message":"Session Added SuccessFully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});


// get all sessions route 
router.get('/all-sessions', async (req,res) => {
    try{

    const session_data = await Session.find().populate('user_id','user_name');
    res.status(200).json(session_data);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({"messgae":"Internal Server"});
    }
});


// Delete assesment route 

router.delete("/delete-session/:id", async (req,res) => {
    try {
        const sessionid = req.params.id;
        const  deletesession = await Session.findById({_id:sessionid});
        if (!deletesession){
            return  res.status(401).json({"message":"Session not Foundd"});
        }
        await Session.findByIdAndDelete(deletesession);
        res.status(200).json({"message":"Session Deleted SuccessFully"});
    }
    catch (error)
    {
        console.log(error);
    };
});

// get session by id 
router.get("/get-session/:id",async (req,res) => {
    try{
        const sessionid = req.params.id;
        const showsession = await Session.findById({_id:sessionid});
        if(!showsession){
            return res.status(401).json({"message":"Id not Found"});
        }
        res.status(200).json(showsession);

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});


   // update session route 
   router.put("/update-session/:id",async (req,res) => {
    try{
        const sessionid = req.params.id;
        const updatedsessiondata = req.body;
        const checkid = await Session.findById(sessionid);
        if(!checkid){
           return  res.status(404).json({"message":"Assesment Not found"});
        }
        await Session.findByIdAndUpdate(checkid,updatedsessiondata);
        res.status(200).json({"message":"Assesment Updated Successfully"});
    }
    catch(error){
        console.log();
        res.status(500).json({"message": "Internal server Error"});
    }
   });


module.exports = router;