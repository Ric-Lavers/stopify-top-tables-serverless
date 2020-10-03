import { TrackObjectFull } from "../../types/spotify-api"
import { addTrack } from "../models/track.model"
import { connectToDatabase } from "../connectToDB"

export const addTracks = async (tracks: TrackObjectFull[]) => {
  try {
    await addTrack(tracks[2])
    // tracks.forEach(async (track) => {
    //   await
    // })
  } catch (error) {
    console.log(error)
  }
}
