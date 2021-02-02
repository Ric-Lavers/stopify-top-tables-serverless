import { connectToDatabase } from "../connectToDB";
import { ArtistObjectFull } from "../../types/spotify-api";

export const addArtist = async (artist: ArtistObjectFull) => {
  // console.log(artist.name)

  const {
    id,
    external_urls,
    href,
    name,
    popularity,
    followers,
    genres,
    images,
    type,
    uri,
  } = artist;

  const { Artist } = connectToDatabase();

  const prevArtist = await Artist.findOne({ id }).catch(() => null);

  if (prevArtist) {
    return prevArtist;
  }

  const newArtist = new Artist({
    id,
    external_urls,
    href,
    name,
    popularity,
    type,
    uri,
    followers,
    genres,
    images,
  });
  await newArtist.save();
  return newArtist;
};
