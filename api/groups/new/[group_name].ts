const cors = require("micro-cors")();
import { createNewGroup } from "../../../db/models/group.model";

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }

    let newGroup = await createNewGroup(
      req.query.group_name,
      req.query.spotify_user_id
    );

    res.status(200).json({
      _id: newGroup._id,
      name: newGroup.group_name,
    });
  } catch (error) {
    console.log("api/groups/new.ts", error);

    res.status(400).send(error);
  }
});
