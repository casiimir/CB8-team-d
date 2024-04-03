const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  complete: { type: Boolean, default: false },
  deadline: { type: Date },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
