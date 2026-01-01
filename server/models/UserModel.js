const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    skills: [{ type: String }],
    profileImagePath: { type: String, default: "" },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application", // Reference to Application model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
