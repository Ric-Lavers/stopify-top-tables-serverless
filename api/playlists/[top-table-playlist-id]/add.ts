const cors = require("micro-cors")();
import { addTracksToTopTablePlaylist } from "../../../db/models/topTablePlaylists.model";

module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }
    if (!req.query.spotify_user_id) throw new Error("no spotify user id");

    let playlist = await addTracksToTopTablePlaylist(
      req.query["top-table-playlist-id"],
      req.query.spotify_user_id,
      req.body.tracks
    );

    res.status(200).json(playlist);
  } catch (error) {
    console.log("api/playlists/all.ts", error);

    res.status(400).send(error);
  }
});
