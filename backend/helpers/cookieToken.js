const getJwtToken = require("./getJwtToken");
// here user will contain whole user object
const cookieToken = (user, res) => {
  // generating the token for user.id
  const token = getJwtToken(user.id);
  const options = {
    expires: new Date(
      // Converting the 3 days into milisecond
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // setting the password to undefined because we are sending the user in res,send()
  // if you are not sending it then don't need to do this
  user.password = undefined;
  // set the cookie and send token and user details to frontend
  res.status(200).cookie("token", token, options).json({
    msg: "success",
    token,
    user,
  });
};
module.exports = cookieToken;
