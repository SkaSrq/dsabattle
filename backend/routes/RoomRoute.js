const express = require("express");
const router = express.Router();

router.post("/create-room", async (req, res) => {
  // console.log("enter room triggered");
  console.log(req.cookies.token);
  res
    .status(200)
    .json({ message: "Room created successfully", roomId: "12345" });
  // res.status(500).json({ message: "Failed to create room", roomId: "" });
});

module.exports = router;
