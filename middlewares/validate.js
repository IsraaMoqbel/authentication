const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const token = req.header('auth-token');
  const verifiedToken = jwt.verify(token, process.env.SECRET);
  req.user = verifiedToken;
  next();
}