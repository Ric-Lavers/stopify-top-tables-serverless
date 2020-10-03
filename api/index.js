require("dotenv").config();

module.exports = {
  REDIRECT_URI: process.env.NODE_ENV === "development" ?
    process.env.REDIRECT_URI_DEV : process.env.REDIRECT_URI,
  FRONTEND_URI: process.env.NODE_ENV === "development" ?
    "http://localhost:3000" : process.env.FRONTEND_URI,

}