const prisma = require("../prisma/index");
const cookieToken = require("../helpers/cookieToken");
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check
    if (!name || !email || !password) {
      console.log("All fields are mendatory!");
    }
    // create a user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    // Set the cookie for user
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Both fields are mendatory!");
    }
    // finding a user based on their email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // If user not found
    if (!user) {
      throw new Error("user doesn't exist!");
    }
    // password mismatch
    if (user.password !== password) {
      throw new Error("username or password is incorrect!");
    }
    // set cookie for this user
    cookieToken(user, res);
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    // clear token cookie and send success msg to frontend
    res.clearCookie("token");
    res.json({
      msg: "success",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
