const mongoose = require("mongoose");

const psychometricTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            optionText: {
                type: String,
                required: true
            }
        }],
        correctOptionIndex: {
            type: Number,
            required: true
        }
    }]
});

const PsychometricTest = mongoose.model("PsychometricTest", psychometricTestSchema);

module.exports = PsychometricTest;
