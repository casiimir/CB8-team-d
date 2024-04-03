const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  resources: {
    water: { type: Number, default: 3 },
    soil: { type: Number, default: 6 },
    seed: { type: Number, default: 3 },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
