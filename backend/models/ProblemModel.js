const mongoose = require("mongoose");
const ProblemSchema = new mongoose.Schema(
  {
    problemId: {
      type: "number",
      default: 0,
    },
    title: {
      type: "string",
      required: true,
    },
    level: {
      type: "string",
      enum: ["Easy", "Medium", "Hard"],
    },
    problemDescription: {
      type: "string",
      default: "",
      required: true,
    },
    example: [
      {
        // type: 'array',
        // default:[{input:{},output:{}}]
        input: {
          type: "string",
          required: true,
        },
        output: {
          type: "string",
          required: true,
        },
        explanation: {
          type: "string",
          required: false,
        },
      },
    ],
    testCases: [
      {
        input: {
          type: "string",
          required: true,
        },
        output: {
          type: "string",
          required: true,
        },
      },
    ],
    accepted: {
      type: "number",
      default: 0,
    },
    submissions: {
      type: "number",
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Problem", ProblemSchema);
