const cors = require("micro-cors")();
import { getGroup } from "../../db/models/group.model";
import { getUserProfile } from "../../db/controllers";

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }
    let { groups } = await getUserProfile(req.query.spotify_user_id);

    res.status(200).json(groups);
  } catch (error) {
    console.log("me/top/saveTopTracks.ts", error);

    res.status(400).send(error);
  }
});
