const cors = require("micro-cors")();
import axios from "axios";

import { getTopTracks, getTopArtists } from "../../../services";
import { connectToDatabase } from "../../../db/connectToDB";
import { addTracks, addArtists } from "../../../db/controllers";
import { TrackObjectFull, ArtistObjectFull } from "../../../types/spotify-api";

// gets all top tables
module.exports = cors(async function (req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.send();
      return;
    }
    const { User } = connectToDatabase();
    const {
      headers: { authorization },
    } = req;

    const data = await Promise.all([
      getTopTracks({ authorization, query: { time_range: "short_term" } }),
      getTopTracks({ authorization, query: { time_range: "medium_term" } }),
      getTopTracks({ authorization, query: { time_range: "long_term" } }),

      getTopArtists({ authorization, query: { time_range: "short_term" } }),
      getTopArtists({ authorization, query: { time_range: "medium_term" } }),
      getTopArtists({ authorization, query: { time_range: "long_term" } }),
    ]);
    const [
      track_short_term,
      track_medium_term,
      track_long_term,

      artist_short_term,
      artist_medium_term,
      artist_long_term,
    ] = data;

    try {
      const artists = data.splice(3);
      const tracks = data;
      await addTracks(
        track_short_term.items as TrackObjectFull[],
        "track_short_term",
        req.query.spotify_user_id
      );
      await addTracks(
        track_medium_term.items as TrackObjectFull[],
        "track_medium_term",
        req.query.spotify_user_id
      );
      await addTracks(
        track_long_term.items as TrackObjectFull[],
        "track_long_term",
        req.query.spotify_user_id
      );
      await addArtists(
        artist_short_term.items as ArtistObjectFull[],
        "artist_short_term" as "short_term" | "medium_term" | "long_term",
        req.query.spotify_user_id
      );
      await addArtists(
        artist_medium_term.items as ArtistObjectFull[],
        "artist_medium_term" as "short_term" | "medium_term" | "long_term",
        req.query.spotify_user_id
      );
      await addArtists(
        artist_long_term.items as ArtistObjectFull[],
        "artist_long_term" as "short_term" | "medium_term" | "long_term",
        req.query.spotify_user_id
      );
    } catch (error) {
      console.log({ error });
    }

    res.json({
      track_short_term,
      track_medium_term,
      track_long_term,

      artist_short_term,
      artist_medium_term,
      artist_long_term,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
