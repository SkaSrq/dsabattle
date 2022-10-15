const mongoose = require("mongoose");
const ExampleSchema = new mongoose.Schema(
  {
    exampleInput: {
      type: "array",
      default: [],
    },
    exampleOutput: {
      type: "array",
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Example", ExampleSchema);
