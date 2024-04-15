const mongoose = require("mongoose");

const dailySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  complete: { type: Boolean, default: false },
  lastCompleted: { type: Date, default: Date.now() },
});

module.exports = mongoose.models.Daily || mongoose.model("Daily", dailySchema);
