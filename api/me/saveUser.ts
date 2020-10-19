const cors = require("micro-cors")()
import { addUser } from "../../db/controllers"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }

    let user = await addUser(req.body)

    res.status(200).json(user)
  } catch (error) {
    console.log("me/top/saveTopTracks.ts", error)

    res.status(400).send(error)
  }
})
