const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    author: { type: String, required: [true, 'Author name is required'], trim: true, maxlength: 100 },
    text: { type: String, required: [true, 'Message text is required'], trim: true, maxlength: 1000 },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

messageSchema.index({ timestamp: -1 });
messageSchema.index({ author: 1 });

module.exports = mongoose.model('Message', messageSchema);
