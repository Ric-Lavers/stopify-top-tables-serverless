const cors = require("micro-cors")()
import { Axios } from "../../config/axiosSetup"

export const getTopArtists = ({ headers, query }) => {
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

    return res.json(topArtists)
  } catch (error) {
    console.log(error)
    res.error(error)
  }
})
