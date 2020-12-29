import { CurrentUsersProfileResponse } from "../../types/spotify-api";
import { connectToDatabase } from "../connectToDB";

export const getUser = async (spotify_user_id: string) => {
  const { User } = connectToDatabase();

  const user = await User.findOne({ id: spotify_user_id })
    .populate("groups", ["name", "id"])
    .populate([
      "track_short_term",
      "track_medium_term",
      "track_long_term",
      "artist_short_term",
      "artist_medium_term",
      "artist_long_term",
    ]);

  return user;
};

export const getUserTopTacks = async (spotify_user_id: string) => {
  const { User, Track, Artist } = connectToDatabase();

  const user = await User.findOne({ id: spotify_user_id });

  let {
    track_short_term,
    track_medium_term,
    track_long_term,
    artist_short_term,
    artist_medium_term,
    artist_long_term,
  } = user;

  const [
    tracks_short_term,
    tracks_medium_term,
    tracks_long_term,
    artists_short_term,
    artists_medium_term,
    artists_long_term,
  ] = await Promise.all([
    Promise.all([].concat(track_short_term).map((id) => Track.findById(id))),
    Promise.all([].concat(track_medium_term).map((id) => Track.findById(id))),
    Promise.all([].concat(track_long_term).map((id) => Track.findById(id))),
    Promise.all([].concat(artist_short_term).map((id) => Artist.findById(id))),
    Promise.all([].concat(artist_medium_term).map((id) => Artist.findById(id))),
    Promise.all([].concat(artist_long_term).map((id) => Artist.findById(id))),
  ]);

  return {
    tracks_short_term,
    tracks_medium_term,
    tracks_long_term,
    artists_short_term,
    artists_medium_term,
    artists_long_term,
  };
};
/**
 *
 */
export const saveUser = async (user: CurrentUsersProfileResponse) => {
  const { User } = connectToDatabase();

  const {
    birthdate,
    country,
    display_name,
    email,
    href,
    id,
    product,
    type,
    uri,
    external_urls,
    followers,
    images,
  } = user;
  const prevUser = await User.findOne({ id }).catch(() => null);

  if (prevUser) {
    console.log("user previously saved");
    return user;
  }

  const newUser = new User({
    birthdate,
    country,
    display_name,
    email,
    href,
    id,
    product,
    type,
    uri,
    external_urls,
    followers,
    images,
  });
  await newUser.save();
  return newUser;
};
