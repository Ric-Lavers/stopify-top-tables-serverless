import { TrackObjectFull } from "../../types/spotify-api"
import { addTrack } from "../models/track.model"

export const addTracks = async (tracks: TrackObjectFull[]) => {
  try {
    // await addTrack(tracks[5])

    for (const track of tracks) {
      await addTrack(track)
    }
  } catch (error) {
    console.log(error)
  }
}
