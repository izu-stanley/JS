const express = require("express");
const router = express.Router();

//@route    GET /api/post/tests
//@desc     Tests posts route
//@access   Public
router.get("/tests", (req, res) => {
  res.json({
    msg: "posts works"
  });
});

module.exports = router;
