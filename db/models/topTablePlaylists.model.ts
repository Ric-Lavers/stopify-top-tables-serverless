import { connectToDatabase } from "../connectToDB";
import { TrackObjectFull } from "../../types/spotify-api";

export const getTopTablePlaylistById = async (topTablePlaylistId: string) => {
  const { TopTracksPlaylist } = connectToDatabase();
  let list = await TopTracksPlaylist.findById(topTablePlaylistId);

  list.tracks.sort((a, b) => a.score - b.score);

  return list;
};

/**
 * This are just playlists that are created using top track data.
 */
export const createNewTopTablePlaylist = async (
  userId: string,
  tracks: TrackObjectFull[]
) => {
  const { TopTracksPlaylist } = connectToDatabase();

  // create top table instance
  const newTopTablePlaylist = new TopTracksPlaylist({
    users_ids: [userId],
    tracks: tracks.map((spotify_id, rank) => ({
      spotify_id,
      rank: rank + 1,
    })),
  });

  const result = await newTopTablePlaylist.save();

  return result;
};

export const addTracksToTopTablePlaylist = async (
  topTablePlaylistId,
  userId: string,
  trackIds: string[]
) => {
  const list = await getTopTablePlaylistById(topTablePlaylistId);

  if (list.users_ids.some((u) => u === userId)) return list;

  list.users_ids.push(userId);
  trackIds
    .map((spotify_id, rank) => ({
      spotify_id,
      rank: rank + 1,
    }))
    .forEach((t) => {
      const exists = list.tracks.find(
        (track) => track.spotify_id === t.spotify_id
      );
      if (exists) {
        exists.count = exists.count + 1;
      } else list.tracks.push(t);
    });
  await list.save();

  const result = await getTopTablePlaylistById(topTablePlaylistId);
  return result;
};
