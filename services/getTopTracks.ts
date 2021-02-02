import { Axios } from "../api/config/axiosSetup"
import { UsersTopTracksResponse } from "../types/spotify-api"

export const getTopTracks = async ({
  authorization,
  query,
}): Promise<UsersTopTracksResponse> => {
  return Axios({
    headers: { authorization },
  }).get("me/top/tracks", {
    params: {
      limit: 50,
      time_range: "short_term",
      ...query,
    },
  })
}
