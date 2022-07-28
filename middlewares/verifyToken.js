const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;
const { responseObject } = require('../helpers/responseObject');

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        // console.log(err);
        res.json(responseObject({ auth: false }, false));
      } else {
        req.userId = decodedToken.id;
        next();
      }
    })
  } else {
    // console.log('no token');
    res.json(responseObject({ auth: false }, false));
  }
}