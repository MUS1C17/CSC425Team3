const express = require('express');
const router = express.Router();

const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
}  = require('../controllers/questionAndAnswerController');


// Create a new question
router.post('/questions', createQuestion);

// Get all questions
router.get('/questions', getAllQuestions);

// Get a specific question by ID
router.get('/questions/:id', getQuestionById);

// Update a question by ID
router.put('/questions/:id', updateQuestion);

// Delete a question by ID
router.delete('/questions/:id', deleteQuestion);

module.exports = router;