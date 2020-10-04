import { ArtistObjectFull } from "../../types/spotify-api"
import { addArtist } from "../models/artist.model"

export const addArtists = async (
  artists: ArtistObjectFull[],
  time_range: string,
  spotify_user_id: string,
  group_id?: string,
) => {
  try {
    // await addTrack(tracks[5])
    const userArtists = []
    for (const artist of artists) {
      const t = await addArtist(artist)

      userArtists.push(t)
    }
  } catch (error) {
    console.log(error)
  }
}
