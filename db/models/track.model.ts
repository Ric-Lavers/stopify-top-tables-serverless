import { TrackObjectFull } from "../../types/spotify-api"
import { connectToDatabase } from "../connectToDB"
/**
 *
 */
export const addTrack = async (track: TrackObjectFull) => {
  const id = track.id
  console.log({ id })
  const { db } = await connectToDatabase("mongodb://127.0.0.1:27017/demo")
  console.log(db)

  const collection = await db.collection("track")
  console.log("collection", collection)

  // console.log({ collection })
  // const tracks = await Track.find({})

  // console.log({ tracks })

  // const prevTrack = await Track.findById(id).exec()

  // // console.log({ prevTrack })
  // // if (prevTrack) return prevTrack

  // const newTrack = new Track({ id, track })
  // newTrack._id = id
  // console.log({ newTrack })
  // return await newTrack.save()
}
