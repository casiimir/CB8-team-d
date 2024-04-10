const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  mongoose.model.Garden || mongoose.model("Garden", gardenSchema);
