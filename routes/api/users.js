const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
//@route    GET /api/users/tests
//@desc     Tests users route
//@access   Public
router.get("/tests", (req, res) => {
  res.json({
    msg: "users works"
  });
});

//@route    GET /api/users/tests
//@desc     Tests users route
//@access   Public
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user).catch(err => console.log(err)));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//@route    GET /api/users/tests
//@desc     Log In/ Get JWT
//@access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).send({ email: "User Not Found" });
    }
    //check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //sign token
        jwt.sign(
          payload,
          keys.secretorKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).send({ msg: "Incorrect Password" });
      }
    });
  });
});

module.exports = router;
