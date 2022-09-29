const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");
// This middleware will check if user is logged in or not
const isLoggedin = async (req, res, next) => {
  try {
    // get the token from cookie
    const token = req.cookie.token;
    if (!token) {
      res.send("Please login");
      throw new Error("User is not logged in!");
    }
    // verify the token with jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If there is a cookie then just set req.user to user with this token
    req.user = await prisma.user.findUnique({
      where: {
        // we have encoded the jwt token using id so we will fetch the user on the basis of id only
        id: decoded.userId,
      },
    });
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};
