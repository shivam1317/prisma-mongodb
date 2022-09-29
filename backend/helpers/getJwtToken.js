const jwt = require("jsonwebtoken");

// This function will generate the jwt token for given userid and secret stored in env
const getJwtToken = (userId) => {
  return jwt.sign({ userid: userId }, process.env.JWT_SECRET);
};
module.exports = getJwtToken;
