const mongoose = require("mongoose");

const notificationModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  },
  message: {
    type: String,
  },
  notifyAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
  },
});
