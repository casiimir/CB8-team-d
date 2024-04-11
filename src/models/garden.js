const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plots: [
    {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
      plant: {
        type: String,
        required: true,
        default: "weed",
      },
      empty: {
        type: Boolean,
        default: true,
        required: true,
      },
    },
  ],
});

module.exports =
  mongoose.models.Garden || mongoose.model("Garden", gardenSchema);
