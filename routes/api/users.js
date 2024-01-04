const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

//@route          POST api/users
//@description    Register user
//@access         public (Token Required)
router.post(
  "/",
  [
    check("name", "You must provide a name").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    // const data = matchedData(req);
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //if user already exists, send a status 200 code and json error message
      //of the same format as our express-validator input error format above
      if (user) {
        return res
          .status(200)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //gravatar module that imports default blank profile image icon
      // s = image size, r = rating, d = default profile image icon
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await User.create({ name, email, password: hash });

      const jwtPayload = {
        user: {
          id: newUser.id,
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
