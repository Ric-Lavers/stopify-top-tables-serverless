const cors = require("micro-cors")()
import { getUserTopTracks } from "../../db/controllers"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }

    let user = await getUserTopTracks(req.query.spotify_user_id)

    res.json(user)
  } catch (error) {
    console.error("me/getUser.ts")

    res.status(400).send(error)
  }
})
