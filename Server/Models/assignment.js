const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    filePath: {
        type: String, 
        default: null
    },
    submissions: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        document: {
            type: String,
            default: null
        },
        result: {
            type: String,
            default: null
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
