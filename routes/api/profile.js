const express = require("express");
const router = express.Router();

//@route    GET /api/profile/tests
//@desc     Tests profile route
//@access   Public
router.get("/tests", (req, res) => {
  res.json({
    msg: "profile works"
  });
});

module.exports = router;
