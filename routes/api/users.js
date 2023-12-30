const express = require("express");
const router = express.Router();

//@route          GET api/post
//@description    test route
//@access         public (Token Required)

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Users route");
});

module.exports = router;
