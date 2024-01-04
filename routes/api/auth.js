const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route          GET api/auth
//@description    Authenticate user using decoded token from middleware
//@access         public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route          POST api/auth
//@description    Authenticate User and get token
//@access         public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      //if user doesn't exist, send a 400 bad request code with the message
      //invalid credentials
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //compare sign in password to matching user hashed password in db
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //if the password was a match, create a token with the payload
      //of a user object containing the user id of our logged in user
      const jwtPayload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        jwtPayload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send();
    }
  }
);

module.exports = router;
