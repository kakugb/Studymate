const express = require('express');
const router = express.Router();
const PsychometricTest = require('../models/sycomatric');

// Create a new psychometric test
// Create a new psychometric test or add a new question to an existing test
router.post('/psyhometric', async (req, res) => {
    try {
        const { name, description, questions } = req.body;
        const testId = req.body.testId; // Assuming you pass the test ID from the frontend

        if (testId) {
            // If a test ID is provided, add the new question to the existing test
            const existingTest = await PsychometricTest.findById(testId);
            if (!existingTest) {
                return res.status(404).json({ message: 'Test not found' });
            }

            // Append the new question to the existing array of questions
            existingTest.questions.push(...questions);

            const updatedTest = await existingTest.save();
            res.json(updatedTest);
        } else {
            // If no test ID is provided, create a new test with the provided questions
            const newTest = await PsychometricTest.create({ name, description, questions });
            res.status(201).json(newTest);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all psychometric tests
router.get('/psyhometric', async (req, res) => {
    try {
        const tests = await PsychometricTest.find();
        res.json(tests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific psychometric test
router.get('/psyhometric/:id', async (req, res) => {
    try {
        const test = await PsychometricTest.findById(req.params.id);
        if (test === null) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json(test);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add questions to an existing psychometric test
router.post('/psyhometric/:id', async (req, res) => {
    try {
        const testId = req.params.id;
        const { questions } = req.body;

        // Find the existing test by ID
        const existingTest = await PsychometricTest.findById(testId);
        if (!existingTest) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Append the new questions to the existing array of questions
        existingTest.questions.push(...questions);

        // Save the updated test
        const updatedTest = await existingTest.save();

        res.json(updatedTest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post('/submit-results', async (req, res) => {
    try {
      // Extract test ID, correct percentage, and incorrect percentage from request body
      const { testId, correctPercentage, incorrectPercentage } = req.body;
  
      // Store the submitted test results in MongoDB
      // Implement your logic here
  
      // Send success response
      res.status(200).json({ message: 'Test results submitted successfully' });
    } catch (error) {
      console.error('Error submitting test results:', error);
      // Send error response
      res.status(500).json({ error: 'Failed to submit test results. Please try again.' });
    }
  });

// Delete a psychometric test
router.delete('/psyhometric/:id', async (req, res) => {
    try {
        await PsychometricTest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Test deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
