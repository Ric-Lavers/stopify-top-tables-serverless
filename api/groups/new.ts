const cors = require("micro-cors")()
import { createNewGroup } from "../../db/models/group.model"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }
    console.log("new")

    let newGroup = await createNewGroup(
      req.query.name,
      req.query.spotify_user_id,
    )
    console.log(newGroup)

    res.status(200).json({
      _id: newGroup._id,
      name: newGroup.name,
    })
  } catch (error) {
    console.log("me/top/saveTopTracks.ts", error)

    res.status(400).send(error)
  }
})
