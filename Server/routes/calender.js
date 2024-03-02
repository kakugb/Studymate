const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const Calender = require("../Models/calender");


// route to add calender event
router.post("/add-event" , async (req , res) => {
    try{
        const{event_name,event_date,event_time,event_description,user_id } = req.body;
        const userid =  await User.findById({_id:user_id});
        if(!userid){
            return res.status(404).json({"message": "user not found"});
        }
        const calenderevent = new Calender({
            event_name,
            event_date,
            event_time,
            event_description,
            user_id:userid._id
        }); 
        await calenderevent.save();
        res.status(200).json({"message":"Event Created Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({"message" : "Internal Server Error"});
    }

});

// route to get all calenders events
router.get('/all-events',async (req,res) => {
    try{
        const calanders = await Calender.find().populate('user_id','user_name');
        res.status(200).json(calanders);
    }
    catch(error){
        console.log(error);
        res.status.json({"message":"Inetrnal Server Error"});
    }

});

// route to delete calender event 

router.delete("/delete-event/:id", async (req,res) => {

    const calanderid = req.params.id;
    const calanderdelete = await Calender.findById(calanderid);
    if(!calanderdelete){
        res.status(404).json({"message": "Event Not Found"});
    }
    await Calender.findByIdAndDelete(calanderdelete);
    res.status(200).json({"message": "Event Deleted Successfully"});
});


// rouet to display event by id 
router.get("/get-event/:id" , async(req,res) => {

    try{
        const calanderid = req.params.id;
        const showevent = await Calender.findById(calanderid);
        if(!showevent){
            res.status(404).json({"message":"Event Not Found"});
        }
        res.status(200).json(showevent);

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Inetrnal Server Error"});
    }
});

// route to update the event 
router.put("/update-event/:id",async (req,res) => {
    try{
        const calendarid = req.params.id;
        const updatedcalenderdata = req.body;
        const checkid = await  Calender.findById(calendarid);
        if(!checkid){
            res.status(404).json({"message":"Event Not Found"});
        }
        await Calender.findByIdAndUpdate(calendarid,updatedcalenderdata);
        res.status(200).json({"message":"Event Updated Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Inetrnal Server Error"});
    }

});
module.exports = router;