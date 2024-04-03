const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: Date.now() },
});

module.exports = mongoose.models.Habit || mongoose.model("Habit", habitSchema);
