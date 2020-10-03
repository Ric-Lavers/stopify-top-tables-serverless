const cors = require("micro-cors")()
import { UsersTopTracksResponse } from "../../../types/spotify-api"
import { Axios } from "../../config/axiosSetup"
import { addTracks } from "../../../db/controllers"
import { connectToDatabase } from "../../../db/connectToDB"

export const getTopTracks = async ({
  headers,
  query,
}): Promise<UsersTopTracksResponse> => {
  return Axios({
    headers: { authorization: headers.authorization },
  }).get("me/top/tracks", {
    params: {
      limit: 50,
      time_range: "short_term",
      ...query,
    },
  })
}

module.exports = cors(async function (req, res) {
  let topTracks
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    topTracks = await getTopTracks(req)

    res.json(topTracks)
  } catch (error) {
    console.log("me/top/tracks", error)

    res.status(400).send(error)
  }

  // add to db
  const { db, Word } = await connectToDatabase("mongodb://localhost:27017/demo")
  console.log(db)

  // addTracks(topTracks.items)
})
