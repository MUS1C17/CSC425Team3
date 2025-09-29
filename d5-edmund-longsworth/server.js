const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/d4-edmund-longsworth";

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.error('Database connection error:', err);
});

//routes
const questionRoutes = require('./routes/questionAndAnswerRoutes');
app.use('/api', questionRoutes);

//default route
app.get('/', (req, res) => {
    res.json({
        success : true,
        data: {
            message: 'Welcome to the Q&A API',
            endpoints: [
                'POST /api/questions - Creating a new question',
                'GET /api/questions - Retrieving all questions',
                'GET /api/questions/:id - Retrieving a specific question by ID',
                'PUT /api/questions/:id - Updating a question by ID',
                'DELETE /api/questions/:id - Deleting a question by ID'
            ]
        }
        
    });
});


//404 handler
app.use(('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
}))

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'An unexpected error occurred'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;