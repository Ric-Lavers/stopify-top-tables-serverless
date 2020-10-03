const request = require("request");
const REDIRECT_URI = require('./index').REDIRECT_URI
const FRONTEND_URI = require('./index').FRONTEND_URI


module.exports = (function (req, res) {

  console.log('callback', req.query)
  //Recieves the code

  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization: "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
          ":" +
          process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    var access_token = body && body.access_token;
    res.redirect(FRONTEND_URI + "?access_token=" + access_token);
  });
});