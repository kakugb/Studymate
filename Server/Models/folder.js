const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created the folder
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
