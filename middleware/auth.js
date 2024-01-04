const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization failed" });
  }

  try {
    decodedToken = jwt.verify(token, config.get("jwtSecret"));

    //our payload has our user object and we assign that to req.user to be
    //used in any of our routes that run this middleware function
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
