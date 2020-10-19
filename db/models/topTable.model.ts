import { connectToDatabase } from "../connectToDB"
import { IUser } from "../db.types"

export const getTopTableFromUser = async (
  User: IUser,
  table_type: "artist" | "track",
  time_range: "short_term" | "medium_term" | "long_term",
) => {
  const { TopTable } = connectToDatabase()
  const key = [table_type, time_range].join("_")
  const id = User[key][0]
  if (!id) return null

  return await TopTable.findById(id).populate()
}

export const getAllTopTablesFromUser = async (User: IUser) => {
  const { TopTable } = connectToDatabase()
  const ids = [
    User.track_short_term[0],
    User.track_medium_term[0],
    User.track_long_term[0],
    User.artist_short_term[0],
    User.artist_medium_term[0],
    User.artist_long_term[0],
  ]
  if (!ids.filter(Boolean).length) return null

  return await Promise.all(ids.map((id) => TopTable.findById(id).populate()))
}
/**
 *
 */
export const saveTopTable = async (
  User: IUser,
  table_type: "artist" | "track",
  trackOrArtistIds: string[],
  time_range: "short_term" | "medium_term" | "long_term",
) => {
  const { TopTable } = connectToDatabase()
  const key = [table_type, time_range].join("_")
  console.log("!!")

  // create top table instance
  const newTopTable = new TopTable({
    user: User._id,
    time_range,
    table_type,
    ids: trackOrArtistIds,
  })
  await newTopTable.save()

  // maybe you want to keep previous records in future.
  User[key] = [newTopTable._id] //trackOrArtistIds

  await User.save()

  return newTopTable
}
