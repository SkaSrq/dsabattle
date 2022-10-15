const express = require("express");
const router = express.Router();
const AllQuestionSchema = require("../models/AllQuestionModel");

router.get("/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  console.log(req.query);
  try {
    const questions = await AllQuestionSchema.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
