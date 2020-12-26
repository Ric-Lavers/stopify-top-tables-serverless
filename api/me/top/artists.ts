const cors = require("micro-cors")()
import axios from "axios"
import { getTopArtists } from "../../../services"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    const topArtists = await getTopArtists({
      authorization: req.headers?.authorization,
      query: req.query,
    })

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
