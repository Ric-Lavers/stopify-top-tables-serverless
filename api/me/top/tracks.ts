const cors = require("micro-cors")()
import axios from "axios"

import { getTopTracks } from "../../../services"

module.exports = cors(async function (req, res) {
  let topTracks
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const {
      headers: { authorization },
      query,
    } = req

    topTracks = await getTopTracks({ authorization, query })

    await axios.post(
      "http://localhost:4000/api/me/top/saveTracks",
      topTracks.items,
      {
        params: {
          ...req.query,
          ...req.headers?.cookie,
        },
        headers: { ...req.headers },
      },
    )

    // await addTracks(topTracks.items)

    res.json(topTracks)
  } catch (error) {
    // console.log("me/top/tracks", error)

    res.status(400).send(error)
  }
})
