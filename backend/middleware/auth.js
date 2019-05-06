const config = require('config');
const jwt = require('jsonwebtoken');

// Token Passed in the header
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {

    //Getting secret variable from config
    const secret = config.get('jwtSecret');
    console.log("------------------------------------------------->", secret);
    // Verify token
    const decoded = jwt.verify(token, secret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}



module.exports = auth;
