const express = require("express");
const router = express.Router();

//@route          GET api/auth
//@description    test route
//@access         public (Token Required)
router.get("/", (req, res) => {
  res.send("Auth route");
});

module.exports = router;