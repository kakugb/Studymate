const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const user = require("../Models/user");
const Role = require("../Models/roles");
const authmiddleware = require("../middleware/auth.middleware");


// Get All user
router.get("/all-users", authmiddleware, async (req, res) => {
  try {
    if (req.userData.role !== "admin" && req.userData.role !=="student") {
      return res
        .status(200)
        .json({ message: "Forbidden Only admin can see the list of users" });
    }
    const Users = await user.find();
    res.status(200).json({ Users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});


// Route to add user
router.post("/adduser", async (req, res) => {
  try {
    const { user_name, email_address, password, role_name } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await Role.findOne({ role_name });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    const newuser = new user({
      user_name,
      email_address,
      password: hashedPassword,
      role: role.role_name,
    });
    await newuser.save();
    res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internale Server Error" });
  }
});

// Route to Delete user
router.delete("/user-delete/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const userdelete = await user.findById({ _id: userid });
    if (!userdelete) {
      return res.status(404).json({ message: "User Not Found!" });
    }
    await user.findByIdAndDelete({ _id: userid });
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internale Server Error" });
  }
});


// Route to update user
router.put("/user-update/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const updateduserdata = req.body;
    const userupdate = await user.findById({ _id: userid });
    if (!userupdate) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    await user.findByIdAndUpdate(userid, updateduserdata);
    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid Server Error" });
  }
});

// Get user by ID route
router.get("/get-user/:id", async (req, res) => {
  try {
      const userID = req.params.id;
      const userData = await user.findById(userID);

      if (!userData) {
          return res.status(404).json({ "message": "User not found" });
      }

      res.status(200).json(userData);
  } catch (error) {
      console.log(error);
      res.status(500).json({ "message": "Internal Server Error" });
  }
});

module.exports = router;
