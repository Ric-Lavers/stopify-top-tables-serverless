const cors = require("micro-cors")()
import { addUserToGroup } from "../../../db/models/group.model"

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200)
      res.send()
      return
    }

    let group = await addUserToGroup(
      req.query.group_name,
      req.query.spotify_user_id
    )

    res.status(200).json(group)
  } catch (error) {
    console.log("api/groups/add/[group_name].ts", error)

    res.status(400).send(error)
  }
})
