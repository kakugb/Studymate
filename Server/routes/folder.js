const express = require("express");
const router = express.Router();
const Folder = require("../Models/folder");


router.post("/folders", async (req, res) => {
    try {
        const { name, createdBy } = req.body;

        
        const newFolder = new Folder({
            name,
            createdBy
        });

       
        await newFolder.save();

        res.status(201).json({ message: "Folder created successfully", folder: newFolder });
    } catch (error) {
        console.error("Error creating folder:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/folders", async (req, res) => {
    try {
        
        const folders = await Folder.find();

        res.status(200).json(folders);
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/folders/:id", async (req, res) => {
    try {
        const folderId = req.params.id;
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        res.status(200).json(folder);
    } catch (error) {
        console.error("Error fetching folder:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/folders/:id", async (req, res) => {
    try {
        const folderId = req.params.id;
        const { name } = req.body;
        await Folder.findByIdAndUpdate(folderId, { name });

        res.status(200).json({ message: "Folder updated successfully" });
    } catch (error) {
        console.error("Error updating folder:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.delete("/folders/:id", async (req, res) => {
    try {
        const folderId = req.params.id;

       
        await Folder.findByIdAndDelete(folderId);

        res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
