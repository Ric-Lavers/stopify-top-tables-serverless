const cors = require("micro-cors")()
import { getUserProfile } from "../../db/controllers"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }

    let user = await getUserProfile(req.query.spotify_user_id)

    res.json(user.groups)
  } catch (error) {
    console.error("me/getUser.ts")

    res.status(400).send(error)
  }
})
