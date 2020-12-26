const cors = require("micro-cors")()
import axios from "axios"
import { Axios } from "../../config/axiosSetup"

import { UsersTopArtistsResponse } from "../../../types/spotify-api"
export const getTopArtists = ({
  headers,
  query,
}): Promise<UsersTopArtistsResponse> => {
  return Axios({
    headers: { authorization: headers.authorization },
  }).get("/me/top/artists", {
    params: {
      limit: 50,
      time_range: "short_term",
      ...query,
    },
  })
}

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const topArtists = await getTopArtists(req)

     await axios.post(
      "http://localhost:4000/api/me/top/saveArtists",
      topArtists.items,
      {
        params: {
          ...req.query,
          ...req.headers?.cookie,
        },
        headers: { ...req.headers },
      },
    )
    res.json(topArtists)
  } catch (error) {
    console.log(error)
    res.error(error)
  }
})
