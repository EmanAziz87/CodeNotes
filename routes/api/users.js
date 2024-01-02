const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");
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

    const data = matchedData(req);

    try {
      let user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      res.send(``);
    } catch (err) {
      console.log(err.message);
      res.status(500).send();
    }
  }
);

module.exports = router;
