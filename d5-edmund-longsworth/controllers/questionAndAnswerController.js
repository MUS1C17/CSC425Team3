const mongoose = require('mongoose');
const QuestionsAndAnswers = require('../models/QuestionsAndAnswers');


//helper to send responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
    const response = { success };

    if(success && data !== null) {
        response.data = data;
    }

    if(!success && error){
        response.error = error;
    }

    return res.status(statusCode).json(response);
};

const createQuestion = async (req, res) => {
    try{
        const sampleQuestion = await QuestionsAndAnswers.create({
            author: req.body.author || "Anonymous",
            text: req.body.text || "Sample question text",
            isAnonymous: req.body.isAnonymous || false,
            upvotes: req.body.upvotes || 0,
            answered: req.body.answered || false,
            mediaUrls: req.body.mediaUrls || [],
            answers: req.body.answers || [],
        });

        sendResponse(res, 201, true, {
            message: 'Question created successfully',
            question: sampleQuestion
        });
    } catch (error) {
        sendResponse(res, 500, false, null, 'Failed to create question'); 
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const {author, answered, page = 1, limit = 25, sort = '-createdAt'} = req.query;

        const query = {};

        if(author) query.author = author;
        if(answered !== undefined) query.answered = answered === 'true';

        const skip = (Number(page) - 1) * Number(limit);

        const[questions, total] = await Promise.all([
            QuestionsAndAnswers.find(query).sort(sort).skip(skip).limit(Number(limit)),
            QuestionsAndAnswers.countDocuments(query)
        ]);

        sendResponse(res, 200, true, { 
            message: 'Questions retrieved successfully',
            questions,
            page: Number(page),
            limit: Number(limit),
            total,
        });
    } catch (error) {
        sendResponse(res, 500, false, null, 'Failed to retrieve questions');
    }
}

const getQuestionById = async (req, res) => {
    try {
        const {id} = req.params;
        
        if(!mongoose.isValidObjectId(id)) {
            return sendResponse(res, 400, false, null, 'Invalid question ID');
        }

        const question = await QuestionsAndAnswers.findById(id);

        if(!question) {
            return sendResponse(res, 404, false, null, 'Question not found');
        }

        sendResponse(res, 200, true, {
            message: 'Question retrieved successfully',
            question,
        });

    } catch (error) {
        sendResponse(res, 500, false, null, 'Failed to retrieve question');
    }
}

const updateQuestion = async (req, res) => {
    try {

        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return sendResponse(res, 400, false, null, 'Invalid question ID');
        }

        const updatedQuestion =  await QuestionsAndAnswers.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if(!updatedQuestion) {
            return sendResponse(res, 404, false, null, 'Question not found');
        }
                
        sendResponse(res, 200, true, {
            message: 'Question updated successfully',
            question: updatedQuestion
        });

    } catch (error) {
        sendResponse(res, 500, false, null, 'Failed to update question');
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return sendResponse(res, 400, false, null, 'Invalid question ID');
        }

        const deletedQuestion = await QuestionsAndAnswers.findByIdAndDelete(id);

        if(!deletedQuestion) {
            return sendResponse(res, 404, false, null, 'Question not found');
        }

        sendResponse(res, 200, true, {
            message: `Question with ID: ${id} deleted successfully`,
            deletedQuestionId: id,
        });


    } catch (error) {
        sendResponse(res, 500, false, null, 'Failed to delete question');
    }
}

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};
