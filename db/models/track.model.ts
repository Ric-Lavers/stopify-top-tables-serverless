import { TrackObjectFull } from "../../types/spotify-api"
import { connectToDatabase } from "../connectToDB"
/**
 *
 */
export const addTrack = async (track: TrackObjectFull) => {
  const id = track.id

  const { Track } = connectToDatabase()

  const prevTrack = await Track.findById(id).catch(() => null)

  console.log(prevTrack)

  if (prevTrack) return prevTrack

  const newTrack = new Track({ id, track })
  console.log({ newTrack })
  return await newTrack.save()
}
