import { TrackObjectFull } from "../../types/spotify-api"
import { addTrack } from "../models/track.model"

export const addTracks = async (tracks: TrackObjectFull[]) => {
  try {
    await addTrack(tracks[0])
    // tracks.forEach(async (track) => {
    //   await
    // })
  } catch (error) {
    console.log(error)
  }
}
