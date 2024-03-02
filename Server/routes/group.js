const express = require("express");
const router = express.Router();
const group = require("../Models/group");
const user =  require("../Models/user")


// Add Group Route
router.post("/assign-group", async (req,res)=> {

    try{
        const {group_name , user_id} = req.body;
        foundUser= await user.findById({_id:user_id });  //checking whether the user is already 
        if(!foundUser){
            res.status(400).json({"message":"User Not Found"});
        }
        const newgroup = new group({
            "group_name":group_name,
            'user_id':foundUser._id
        });
        await newgroup.save();
        res.status(201).json({"message": "Group Assigned Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});

// Delete Group route 
router.delete("/group-delete/:id" , async(req,res) => {
    try{
        const groupid = req.params.id;
        const groupdelete = await group.findById({_id:groupid});
        if(!groupdelete){
            res.status(400).json({"message":"Group not found"});
        }
        await group.findByIdAndDelete({_id:groupid});
        res.status(200).json({"message":"Group Deleted Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }

});

// Update Group route 
router.put("/group-update/:id" , async(req,res) => {
    try{
        const groupid = req.params.id;
        const updatedgroupdata = req.body;
        checkid = await group.findById({_id:groupid});
        if(!checkid){
            res.status(400).json({"message":"Group not found"})
        }
        await group.findByIdAndUpdate(groupid,updatedgroupdata);
        res.status(200).json({"message":"Group Updated Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({"messagae":"Internal Server Error"});
    }

});

// Get all groups route
router.get("/get-all-groups", async (req, res) => {
    try {
        const allGroups = await group.find().populate('user_id','user_name');
        res.status(200).json(allGroups);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
});

// Get group by ID route
router.get("/get-group/:id", async (req, res) => {
    try {
        const groupID = req.params.id;
        const groupData = await group.findById(groupID);

        if (!groupData) {
            return res.status(404).json({ "message": "Group not found" });
        }

        res.status(200).json(groupData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
});


module.exports = router;
