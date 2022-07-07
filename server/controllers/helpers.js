const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

/**
 * 
 * @param {any} data contains the response (either an actual message or an error message)
 * @param {Boolean} ok should be a boolean
 * @param {Error} error [optional] should be an error object.
 * @returns an object with the parameters explained above as properties.
 */

module.exports.responseObject = (data, ok, error = null) => ({
  data,
  ok,
  error,
});


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