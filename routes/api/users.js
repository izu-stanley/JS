const express = require("express");
const router = express.Router();

//@route    GET /api/users/tests
//@desc     Tests users route
//@access   Public
router.get("/tests", (req, res) => {
  res.json({
    msg: "users works"
  });
});

module.exports = router;
