require("dotenv").config()
const querystring = require("querystring")

const topTablePermissions = require("../config/permissions").topTablePermissions

const REDIRECT_URI = require("../index").REDIRECT_URI

module.exports = function (req, res) {
  console.log("loggin in")
  // asks for the code
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: topTablePermissions,
        redirect_uri: REDIRECT_URI,
      }),
  )
}
