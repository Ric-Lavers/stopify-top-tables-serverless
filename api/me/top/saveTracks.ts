const cors = require("micro-cors")();
import { addTracks } from "../../../db/controllers";

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }

    let topTracks = await addTracks(
      req.body,
      req.query.time_range,
      req.query.spotify_user_id,
      null
    );
    console.log(topTracks);

    res.status(200).json({ saved: true });
  } catch (error) {
    console.log("me/top/saveTopTracks.ts", error);

    res.status(400).send(error);
  }
});
