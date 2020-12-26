import { ArtistObjectFull } from "../../types/spotify-api"
import { addArtist } from "../models/artist.model"
import { getUser } from "../models/user.model"
import { addTopTable } from "./addTopTable"
import { IUser } from "../db.types"

export const addArtists = async (
  artists: ArtistObjectFull[],
  time_range: "short_term" | "medium_term" | "long_term",
  spotify_user_id: string,
  group_id?: string,
) => {
  try {
    //* saves any new artists to db
    const userArtistsIds = []
    for (const artist of artists) {
      const a = await addArtist(artist)
      userArtistsIds.push(a._id)
    }
    //* gets current user
    const User = await getUser(spotify_user_id)

    //* saves/overides users topTable for time_range
    await addTopTable(User as IUser, "artist", userArtistsIds, time_range)


    const key = `artist_${time_range}`
    User[key] = userArtistsIds
    await User.save()
    console.log(User);
  } catch (error) {
    console.log(error)
  }
}
