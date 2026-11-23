
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    sourceId: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    username: String,
    email: String,
    address: mongoose.Schema.Types.Mixed,
    phone: String,
    website: String,
    company: mongoose.Schema.Types.Mixed,
    passwordHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
