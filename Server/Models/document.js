const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false // Default to false, meaning documents are private by default
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the user who uploaded the document
      required: true
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'folder', // Reference to the folder where the document is stored
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  })
  const Document = mongoose.model('Document', documentSchema);

module.exports = Document;