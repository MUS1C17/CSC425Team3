const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require('../controllers/messageController');

// POST /api/messages → Create a new message
router.post('/messages', createMessage);

// GET /api/messages → Get all messages
router.get('/messages', getAllMessages);

// GET /api/messages/:id → Get a specific message by ID
router.get('/messages/:id', getMessageById);

// PUT /api/messages/:id → Update a message by ID
router.put('/messages/:id', updateMessage);

// DELETE /api/messages/:id → Delete a message by ID
router.delete('/messages/:id', deleteMessage);

module.exports = router;