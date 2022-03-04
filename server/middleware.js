require("dotenv");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("./models/userModel");

//authentication (start)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(
        JSON.parse(token),
        process.env.ACCESS_TOKEN_SECRET
      );
      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
//authentication (end)

//BREAK//

//generate new token (start)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
};
//generate new token (end)

//BREAK//

module.exports = { protect, generateToken };
