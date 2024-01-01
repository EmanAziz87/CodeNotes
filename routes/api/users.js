const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");

//@route          POST api/users
//@description    Register user
//@access         public (Token Required)

router.get(
  "/",
  [
    check("person", "You must provide a name").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    // res.send("Users route");
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);
    res.send(
      `Hello, ${data.person}! email: ${email} --- password: ${password}`
    );
  }
);

module.exports = router;
