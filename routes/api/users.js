const express = require("express");
const router = express.Router();

//@route          GET api/users
//@description    test route
//@access         public (Token Required)
router.get("/", (req, res) => {
  res.send("Users route");
});

module.exports = router;
