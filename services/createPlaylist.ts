import { Axios } from "../api/config/axiosSetup";
import {} from "../types/spotify-api";

export const getTopArtists = (
  authorization,
  playlistName,
  user_id,
  isPublic = true,
  collaborative = true,
  description = null
): Promise<any> => {
  return Axios({
    headers: { authorization },
  }).get(`users/${user_id}/playlists`, {
    name: playlistName,
    public: isPublic,
    collaborative,
    description,
  });
};
