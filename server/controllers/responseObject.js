
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
