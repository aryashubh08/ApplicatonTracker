const mongoose = require("mongoose");
const User = require("./UserModel");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobPortal: {
      type: String,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer", "Rejected"],
      default: "Applied",
    },
    interviewDate: {
      type: Date, // optional
    },
    notes: {
      type: String, // additional info
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
