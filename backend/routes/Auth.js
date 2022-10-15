const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";
router.get("/signin", async (req, res) => {
  //   const email = req.body.email;
  //   const reqPassword = req.body.password;
  const email = req.query.email;
  const reqPassword = req.query.password;
  console.log(email, reqPassword);
  let error = {};
  try {
    const user = await User.findOne({ email });
    if (!user) {
      error = {
        ...error,
        error: "User not found",
      };
      return res.status(404).json(error);
    }

    const validPassword = await bcrypt.compare(reqPassword, user.password);
    if (!validPassword) {
      error = {
        ...error,
        error: "Incorrect Password",
      };
      return res.status(400).json(error);
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const { password, _id, updatedAt, createdAt, ...others } = user._doc;
    return res.status(200).cookie("token", token, options).json(others);
  } catch (error) {
    console.warn(error);
    return res.status(500).json(error);
  }
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  let error = {};
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      error = {
        ...error,
        error: "email already in exist",
      };
      return res.status(402).json(error);
    }
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // genereate new user
    const user = await new User({
      email,
      password: hashedPassword,
    });

    // save user to database
    const savedUser = await user.save();

    // send response to frontend
    return res.status(200).json(savedUser);
  } catch (error) {
    console.warn(error);
    return res.status(500).json(error);
  }
});
module.exports = router;
