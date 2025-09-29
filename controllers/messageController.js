const mongoose = require('mongoose');
const Message = require('../models/Message');

const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const body = { success };
  if (success && data !== null) body.data = data;
  if (!success && error) body.error = error;
  return res.status(statusCode).json(body);
};

// POST /api/messages
const createMessage = async (req, res) => {
  try {
    const { author, text, isRead } = req.body;
    const msg = await Message.create({ author, text, isRead });
    return sendResponse(res, 201, true, { message: msg });
  } catch (err) {
    return sendResponse(res, 400, false, null, err.message);
  }
};

// GET /api/messages  (?author=&page=&limit=&sort=)
const getAllMessages = async (req, res) => {
  try {
    const { author, page = 1, limit = 25, sort = '-createdAt' } = req.query;
    const query = {};
    if (author) query.author = author;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Message.find(query).sort(sort).skip(skip).limit(Number(limit)),
      Message.countDocuments(query),
    ]);

    return sendResponse(res, 200, true, {
      messages: items,
      page: Number(page),
      limit: Number(limit),
      total,
    });
  } catch {
    return sendResponse(res, 500, false, null, 'Failed to retrieve messages');
  }
};

// GET /api/messages/:id
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message id');
    }
    const msg = await Message.findById(id);
    if (!msg) return sendResponse(res, 404, false, null, 'Message not found');
    return sendResponse(res, 200, true, { message: msg });
  } catch {
    return sendResponse(res, 500, false, null, 'Failed to retrieve message');
  }
};

// PUT /api/messages/:id
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message id');
    }
    const msg = await Message.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!msg) return sendResponse(res, 404, false, null, 'Message not found');
    return sendResponse(res, 200, true, { message: msg });
  } catch (err) {
    return sendResponse(res, 400, false, null, err.message);
  }
};

// DELETE /api/messages/:id
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message id');
    }
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) return sendResponse(res, 404, false, null, 'Message not found');
    return sendResponse(res, 200, true, { deletedId: id });
  } catch {
    return sendResponse(res, 500, false, null, 'Failed to delete message');
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
