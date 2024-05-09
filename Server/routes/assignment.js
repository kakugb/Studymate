const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Assignment = require("../Models/assignment");
const path = require("path"); // Import the path module

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

router.post("/assignments/create", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileName = path.basename(filePath);

        if (!mongoose.Types.ObjectId.isValid(req.body.teacher_id)) {
            return res.status(400).json({ message: "Invalid teacher ID format" });
        }

        const newAssignment = new Assignment({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            teacher_id: req.body.teacher_id,
            filePath: fileName,
        });
        await newAssignment.save();

        res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});






// Read All Assignments Route
router.get("/assignments/getAll", async (req, res) => {
    try {
        const allAssignments = await Assignment.find();
        res.status(200).json(allAssignments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Read Assignment by ID Route
router.get("/assignments/getById/:id", async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/assignments/update/:id", upload.single("file"), async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const updatedAssignmentData = req.body;

        // Check if a new file is uploaded
        if (req.file) {
            const filePath = req.file.path;
            const fileName = path.basename(filePath);
            updatedAssignmentData.filePath = fileName;
        }

        await Assignment.findByIdAndUpdate(assignmentId, updatedAssignmentData);
        res.status(200).json({ message: "Assignment updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
 



// Delete Assignment Route
router.delete("/assignments/delete/:id", async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




// Student upload file


router.post("/assignments/uploadFile", upload.single("file"), async (req, res) => {
    try {
        // Get the file path from the uploaded file
        const filePath = req.file.path;
        const fileName = path.basename(filePath);
        // Assuming you have authentication middleware to extract student ID from the request
        const {studentId, assignmentId} = req.body;

        

        // Update the assignment document to include the student's file
        const assignment = await Assignment.findById({
            _id:assignmentId
        });
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Add the student's file to the assignment submissions
        assignment.submissions.push({
            student: studentId,
            document: fileName
        });

        await assignment.save();

        res.status(201).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


 
router.put("/assignments/updateResult/:assignmentId",upload.single("file"), async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const { studentId, result } = req.body;

        // Find the assignment by ID
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Update the result for the specific student
        const submissionIndex = assignment.submissions.findIndex(sub => sub.student.toString() === studentId);
        if (submissionIndex === -1) {
            return res.status(404).json({ message: "Submission not found for this student" });
        }

        assignment.submissions[submissionIndex].result = result;
        await assignment.save();

        res.status(200).json({ message: "Assignment result updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/assignments/submissions/:assignmentId", async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const student = req.params.student;

        // Find the assignment by ID
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Get submissions for the assignment
        const submissions = assignment.submissions;

        // If there are no submissions, return an empty array
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found for this assignment" });
        }

        // Map submissions to include both ID and document filename
        const submissionDetails = submissions.map(submission => ({
            id: submission._id,
            document: submission.document,
            student:submission.student
        }));

        // Return the submission details
        res.status(200).json(submissionDetails);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = router;
