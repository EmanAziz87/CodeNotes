const express = require("express");
const router = express.Router();

//@route          GET api/profile
//@description    test route
//@access         public (Token Required)
router.get("/", (req, res) => {
  res.send("Profile route");
});

module.exports = router;
