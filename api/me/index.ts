const cors = require("micro-cors")()
require("dotenv").config()
import { Axios } from "../config/axiosSetup"

const currentUserProfile = ({ headers, headers: { authorization } }) => {
  return Axios({
    headers: { ...(authorization ? { authorization } : {}) },
  }).get("me")
}

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const userProfile = await currentUserProfile(req)
    res.json(userProfile)
  } catch (error) {
    console.log(error.message)

    // the user is probably not logged in
    res.status(401).send(error)
  }
})
