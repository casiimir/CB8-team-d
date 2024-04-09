const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plots: [
    {
      x: Number,
      y: Number,
      plant: { type: String, default: null },
    },
  ],
});

module.exports =
  mongoose.models.Garden || mongoose.model("Garden", gardenSchema);
