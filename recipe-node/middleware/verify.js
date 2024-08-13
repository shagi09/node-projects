const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.login; // Assuming the token is stored in a cookie

  if (!token) {
    return res.redirect('/login'); // Redirect to the login page if no token is present
  }

  jwt.verify(token, 'shalom secret', (err, decoded) => {
    if (err) {
      return res.redirect('/login'); // Redirect to the login page if the token is invalid
    }
 // Store the decoded user data in the request object
    next(); // Allow the request to continue to the next middleware
  });
}
module.exports=verifyToken