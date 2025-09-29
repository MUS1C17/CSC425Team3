const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [100, 'Author cannot exceed 100 characters'],
    },
    text: {
        type: String,
        required: [true, 'Answer text is required'],
        trim: true,
        maxlength: [2000, 'Answer text cannot exceed 2000 characters'],
    },
    isInstructor: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const questionSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [100, 'Author cannot exceed 100 characters'],
    },

    text:{
        type: String,
        required: [true, 'Question text is required'],
        trim: true,
        maxlength: [2000, 'Question text cannot exceed 2000 characters'],
    },

    isAnonymous: {
        type: Boolean,
        default: false,
    },

    upvotes: {
        type: Number,
        default: 0,
    },

    answered: {
        type: Boolean,
        default: false,
    },

    mediaUrls: [ //incase users want to add media for context
        {
            type: String,
            trim: true,
        }
    ], 

    answers: [answerSchema], //embedded answers
}, { timestamps: true //createdAt and updatedAt
});


questionSchema.index({createdAt: -1});
questionSchema.index({upvotes: -1});
questionSchema.index({answered: 1});

module.exports = mongoose.model('Question', questionSchema);