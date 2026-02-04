require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/backend-example';

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);

// health
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Backend Example API is running!',
      endpoints: [
        'POST /api/messages',
        'GET /api/messages',
        'GET /api/messages/:id',
        'PUT /api/messages/:id',
        'DELETE /api/messages/:id'
      ]
    }
  });
});

// 404 + error handlers
app.use('*', (req, res) => res.status(404).json({ success: false, error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// connect DB first, then start server
(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { family: 4 });
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();
