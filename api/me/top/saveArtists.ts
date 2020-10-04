const cors = require("micro-cors")()

import { addArtists } from "../../../db/controllers"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const cookies = req.headers?.cookie.split(";").reduce((a, c) => {
      let [k, v] = c.split("=")
      a[k] = v
      return a
    }, {})

    let topArtists = await addArtists(
      req.body,
      req.query.time_range,
      cookies.spotify_user_id,
    )

    res.status(200).json({ saved: true })
  } catch (error) {
    console.log("me/top/saveTopTracks.ts", error)

    res.status(400).send(error)
  }
})
