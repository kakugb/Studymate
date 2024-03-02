const express = require("express");
const router = express.Router();
const Task = require("../Models/task");
const User = require("../Models/user"); 
const Group = require("../Models/group");


// route to assign a task 
router.post("/add-task" , async(req,res) => {
    try{
        const {task_name,priority,deadline,status,user_id,group_id} = req.body;
        checkuser = await User.findById({_id:user_id});
        if(!checkuser){
            res.status(404).json({"message":"User Not Found"});
        }
        checkgroup = await Group.findById({_id:group_id});
        if(!checkgroup){
            res.status(404).json({"message":"Group Not Found"});
        };

       const newtask = new Task({
        "task_name":task_name,
        "priority":priority,
        "deadline":deadline,
        "status":status,
        "user_id":checkuser._id,
        "group_id":checkgroup._id,
       });
      await newtask.save();
      res.status(200).json({"message":"Task Assigned Succesfully"});



    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({"message": "Internal Server Error"});
    }
});

// route to get all task
router.get("/all-task", async (req,res) => {

    try{
        const alltask = await Task.find().populate('user_id','user_name').populate('group_id','group_name')
       res.status(200).json(alltask);

    }
    catch (error){
        console.log(error);
        res.status(500).json({"message":"internal Server Error"});
    }
}); 

// route to delete task
router.delete("/delete-task/:id", async (req,res) => {
    try{

        const taskid = req.params.id;
        const taskdelete = await Task.findById({_id:taskid});
        if(!taskdelete){
            res.status(404).json({"message":"Task Not Found"});
        }
        await Task.findByIdAndDelete({_id:taskid});
        res.status(200).json({"message":"Task Deleted Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Internal Server Error"});
    }
});

// route to display a task by id
router.get("/get-task/:id", async (req, res) => {
    try {
        const taskid = req.params.id;
        const showtask = await Task.findById({_id:taskid});
        if (!showtask) {
            res.status(404).json({ "message": "Task Not Found" });
        }
        res.status(200).json(showtask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
});

// route to update the task 
router.put("/update-task/:id", async (req,res) => {
    try{
        const taskid = req.params.id;
        const updatedtaskdata = req.body;
        const checkid = await Task.findById(taskid);
        if(!checkid){
             res.status(404).json({"message":"Task Not found"});
        }
        await Task.findByIdAndUpdate(checkid,updatedtaskdata);
        res.status(200).json({"message":"Task Updated Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Inetrnal Server Error"});
    }

});


module.exports = router;
