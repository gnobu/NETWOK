const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.json(this.responseObject({ auth: false }, false));
      } else {
        next();
        // console.log(decodedToken);
      }
    })
  } else {
    res.json(this.responseObject({ auth: false }, false));
  }
}