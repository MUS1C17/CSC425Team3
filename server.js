const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/backend-example';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Backend Example API is running!',
      endpoints: [
        'POST /api/messages - Create a new message',
        'GET /api/messages - Get all messages',
        'GET /api/messages/:id - Get a specific message by ID',
        'PUT /api/messages/:id - Update a message by ID',
        'DELETE /api/messages/:id - Delete a message by ID'
      ]
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});

module.exports = app;