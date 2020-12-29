import { ArtistObjectFull } from "../../types/spotify-api";
import { addArtist } from "../models/artist.model";
import { getUser } from "../models/user.model";
import { addTopTable } from "./addTopTable";
import { IUser } from "../db.types";

export const addArtists = async (
  artists: ArtistObjectFull[],
  time_range: "short_term" | "medium_term" | "long_term",
  spotify_user_id: string,
  group_id?: string
) => {
  try {
    //* saves any new artists to db
    const userArtists = await Promise.all(artists.map((a) => addArtist(a)));

    //* gets current user
    const user = await getUser(spotify_user_id);

    //* saves/overides users topTable for time_range
    // await addTopTable(User as IUser, "artist", userArtistsIds, time_range);

    user[time_range] = userArtists.map(({ _id }) => _id);
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
