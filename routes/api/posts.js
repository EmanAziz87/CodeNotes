const express = require("express");
const router = express.Router();

//@route          GET api/posts
//@description    test route
//@access         public (Token Required)
router.get("/", (req, res) => {
  res.send("Posts route");
});

module.exports = router;