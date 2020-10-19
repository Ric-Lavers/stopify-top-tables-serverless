import { saveTopTable } from "../models/topTable.model"
import { IUser } from "../db.types"

export const addTopTable = async (
  user: IUser,
  table_type: "artist" | "track",
  trackOrArtistIds: string[],
  time_range: "short_term" | "medium_term" | "long_term",
) => {
  try {
    return await saveTopTable(user, table_type, trackOrArtistIds, time_range)
  } catch (error) {
    console.log(error)
  }
}
