const mongoose = require("mongoose");

const userResourcesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  water: {
    type: Number,
    default: 6,
    required: true,
  },
  seeds: {
    type: Number,
    default: 3,
    required: true,
  },
  soil: {
    type: Number,
    default: 3,
    required: true,
  },
});

module.exports =
  mongoose.models.UserResources ||
  mongoose.model("UserResources", userResourcesSchema);
