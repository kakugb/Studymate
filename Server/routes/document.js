// Import required modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Document = require("../Models/document");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Upload a file 



router.post("/documents", upload.single("file"), async (req, res) => {
    try {
        const { title, description, isPublic, uploadedBy, folder } = req.body;


        const fileUrl = req.file.path;  
       
        const newDocument = new Document({
            title,
            description,
            fileUrl, 
            isPublic,
            uploadedBy,
            folder
        });

        
        await newDocument.save();

        res.status(201).json({ message: "Document created successfully", document: newDocument });
    } catch (error) {
        console.error("Error creating document:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/documents", async (req, res) => {
    try {
        // Retrieve all documents from the database
        const documents = await Document.find();
        
        // Return the list of documents
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/documents/:id", async (req, res) => {
    try {
        const documentId = req.params.id;

       
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json(document);
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/documents/:id", async (req, res) => {
    try {
        const documentId = req.params.id;
        const { title, description, fileUrl, isPublic, folder } = req.body;

        // Find the document by ID
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        // Update the document fields
        document.title = title;
        document.description = description;
        document.fileUrl = fileUrl;
        document.isPublic = isPublic;
        document.folder = folder;

        // Save the updated document
        await document.save();

        res.status(200).json({ message: "Document updated successfully" });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.delete("/documents/:id", async (req, res) => {
    try {
        const documentId = req.params.id;


        await Document.findByIdAndDelete(documentId);

        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
