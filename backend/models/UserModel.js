const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
    },
    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    allchallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    isOnline: {
      type: "boolean",
      default: false,
    },
    role: {
      type: "string",
      enum: ["USER", "ADMIN"],
      defaults: "USER",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
