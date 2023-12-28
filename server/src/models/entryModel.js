const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date().toLocaleDateString(),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Entry", entrySchema);
