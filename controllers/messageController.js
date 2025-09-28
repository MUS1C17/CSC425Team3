const Message = require('../models/Message');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };

  if (success && data !== null) response.data = data;
  if (!success && error) response.error = error;

  return res.status(statusCode).json(response);
};

// Utility to format a message object for output
const formatMessage = (msg) => ({
  id: msg._id.toString(),
  author: msg.author,
  text: msg.text,
  timestamp: msg.timestamp,
  isRead: msg.isRead
});

// POST /api/messages → Create a new message
const createMessage = async (req, res) => {
  try {
    const { author, text } = req.body;

    const newMessage = await Message.create({
      author,
      text,
      timestamp: new Date(),
      isRead: false
    });

    sendResponse(res, 201, true, {
      message: "Message created successfully",
      messageData: formatMessage(newMessage)
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to create message");
  }
};

// GET /api/messages → Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    sendResponse(res, 200, true, {
      messages: messages.map(formatMessage),
      count: messages.length
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to retrieve messages");
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) return sendResponse(res, 404, false, null, "Message not found");

    sendResponse(res, 200, true, {
      message: formatMessage(message)
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to retrieve message");
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMessage) return sendResponse(res, 404, false, null, "Message not found");

    sendResponse(res, 200, true, {
      message: "Message updated successfully",
      messageData: formatMessage(updatedMessage)
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to update message");
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return sendResponse(res, 404, false, null, "Message not found");

    sendResponse(res, 200, true, {
      message: `Message with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to delete message");
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};

/*const Message = require('../models/Message');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };
  
  if (success && data !== null) {
    response.data = data;
  }
  
  if (!success && error) {
    response.error = error;
  }
  
  return res.status(statusCode).json(response);
};

// POST /api/messages → Create a new message
const createMessage = async (req, res) => {
  try {
    // For now, return placeholder response
    // TODO: Implement database logic
    
    const sampleMessage = {
      id: "placeholder-id-123",
      author: req.body.author || "Sample Author",
      text: req.body.text || "Sample message text",
      timestamp: new Date().toISOString(),
      isRead: false
    };

    sendResponse(res, 201, true, {
      message: "Message created successfully",
      messageData: sampleMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to create message");
  }
};

// GET /api/messages → Get all messages
const getAllMessages = async (req, res) => {
  try {
    // For now, return placeholder response
    // TODO: Implement database logic
    
    const sampleMessages = [
      {
        id: "msg-001",
        author: "John Doe",
        text: "Hello, this is the first message!",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isRead: false
      },
      {
        id: "msg-002",
        author: "Jane Smith",
        text: "This is another sample message.",
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        isRead: true
      },
      {
        id: "msg-003",
        author: "Bob Johnson",
        text: "Latest message in the system.",
        timestamp: new Date().toISOString(),
        isRead: false
      }
    ];

    sendResponse(res, 200, true, {
      messages: sampleMessages,
      count: sampleMessages.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve messages");
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const sampleMessage = {
      id: id,
      author: "Sample Author",
      text: `This is a sample message with ID: ${id}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    sendResponse(res, 200, true, {
      message: sampleMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve message");
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const updatedMessage = {
      id: id,
      author: updateData.author || "Updated Author",
      text: updateData.text || "Updated message text",
      timestamp: new Date().toISOString(),
      isRead: updateData.isRead !== undefined ? updateData.isRead : false
    };

    sendResponse(res, 200, true, {
      message: "Message updated successfully",
      messageData: updatedMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to update message");
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    sendResponse(res, 200, true, {
      message: `Message with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete message");
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};*/