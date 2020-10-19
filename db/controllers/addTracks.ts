import { TrackObjectFull } from "../../types/spotify-api"
import { addTrack } from "../models/track.model"
import { getUser } from "../models/user.model"

export const addTracks = async (
  tracks: TrackObjectFull[],
  time_range: string,
  spotify_user_id: string,
  group_id: string,
) => {
  try {
    // await addTrack(tracks[5])
    const userTracks = []
    for (const track of tracks) {
      const t = await addTrack(track)

      userTracks.push(t)
    }

    const user = await getUser(spotify_user_id)
    user[`track_${time_range}`] = userTracks
    await user.save()
  } catch (error) {
    console.log(error)
  }
}
