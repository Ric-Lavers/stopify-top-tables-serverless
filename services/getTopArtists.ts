import { Axios } from "../api/config/axiosSetup"
import {
  UsersTopArtistsResponse,
  UsersTopTracksResponse,
} from "../types/spotify-api"

export const getTopArtists = ({
  authorization,
  query,
}): Promise<UsersTopArtistsResponse> => {
  return Axios({
    headers: { authorization },
  }).get("/me/top/artists", {
    params: {
      limit: 50,
      time_range: "short_term",
      ...query,
    },
  })
}
