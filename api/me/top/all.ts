const cors = require("micro-cors")()

import { getTopTracks, getTopArtists } from "../../../services"

// gets all top tables
module.exports = cors(async function (req, res) {
  console.log("ALL", getTopTracks, getTopArtists)
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const {
      headers: { authorization },
    } = req

    const [
      track_short_term,
      track_medium_term,
      track_long_term,

      artist_short_term,
      artist_medium_term,
      artist_long_term,
    ] = await Promise.all([
      getTopTracks({ authorization, query: { time_range: "short_term" } }),
      getTopTracks({ authorization, query: { time_range: "medium_term" } }),
      getTopTracks({ authorization, query: { time_range: "long_term" } }),

      getTopArtists({ authorization, query: { time_range: "short_term" } }),
      getTopArtists({ authorization, query: { time_range: "medium_term" } }),
      getTopArtists({ authorization, query: { time_range: "long_term" } }),
    ])

    res.json({
      track_short_term,
      track_medium_term,
      track_long_term,

      artist_short_term,
      artist_medium_term,
      artist_long_term,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
