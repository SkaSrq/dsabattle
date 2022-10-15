const mongoose = require("mongoose");
const ChallengeSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    challengeTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    challengeFrom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user1Status: {
      type: "string",
      enum: ["SENT", "JOINED", "ONGOING", "COMPLETED"],
    },
    user2Status: {
      type: "string",
      enum: [
        "PENDING",
        "ACCEPTED",
        "DECLINED",
        "JOINED",
        "ONGOING",
        "COMPLETED",
      ],
    },
    totalTime: {
      type: "date",
      default: Date.now(),
    },
    timeTaken: {
      type: "date",
      default: Date.now(),
    },
    challengeType: {
      type: "string",
      enum: ["RANDOM", "BY_USER"],
    },
    status: {
      type: "string",
      enum: ["INITIALIZED", "ONGOING", "COMPLETED", "CANCELED"],
    },
    winner: {
      type: "string",
      default: "-",
    },
  },
  { timestamps: true }
);

// user 1 - accepted
// user 2 - accepted
// change status : on + chalenges startas with date.now() + 30 secins
// set challemges ends on : date.ow()+ 30 + 30 min

// usre 1

module.exports = mongoose.model("Challenge", ChallengeSchema);
