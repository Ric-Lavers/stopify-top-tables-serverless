import { CurrentUsersProfileResponse } from "../types/spotify-api"

export interface IUser extends CurrentUsersProfileResponse {
  _id: string
  findOne: Function
  save: Function
  track_short_term: string[]
  track_medium_term: string[]
  track_long_term: string[]
  artist_short_term: string[]
  artist_medium_term: string[]
  artist_long_term: string[]
}
