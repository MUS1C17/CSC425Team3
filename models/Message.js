const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  text: {
    type: String,
    required: [true, 'Message text is required'],
    trim: true,
    maxlength: [1000, 'Message text cannot exceed 1000 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Add indexes for better query performance
messageSchema.index({ timestamp: -1 });
messageSchema.index({ author: 1 });

module.exports = mongoose.model('Message', messageSchema);