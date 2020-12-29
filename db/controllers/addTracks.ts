import { TrackObjectFull } from "../../types/spotify-api";
import { addTrack } from "../models/track.model";
import { getUser } from "../models/user.model";

export const addTracks = async (
  tracks: TrackObjectFull[],
  time_range: string,
  spotify_user_id: string,
  group_id?: string
) => {
  try {
    const userTracks = await Promise.all(tracks.map((t) => addTrack(t)));

    const user = await getUser(spotify_user_id);

    user[time_range] = userTracks.map(({ _id }) => _id);
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
