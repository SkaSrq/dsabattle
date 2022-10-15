const mongoose = require("mongoose");
const AllQuestionSchema = new mongoose.Schema(
  {
    title: { type: "string" },
    titleSlug: { type: "string" },
    translatedTitle: { type: "string" },
    questionId: {
      type: "string",
    },
    questionFrontendId: { type: "string" },
    status: { type: "string", enum: ["Easy", "Medium", "Hard"] },
    difficulty: { type: "string" },
    isPaidOnly: { type: "string" },
    categoryTitle: { type: "string" },
    __typename: { type: "string" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("questions", AllQuestionSchema);
