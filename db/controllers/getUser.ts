import { CurrentUsersProfileResponse } from "../../types/spotify-api"
import { getUser, getUserTopTacks } from "../models/user.model"

export const getUserProfile = async (id) => {
  try {
    const User = await getUser(id)

    return User
  } catch (error) {
    console.log(error)
  }
}

export const getUserTopTracks = async (id) => {
  try {
    const UserTopTracks = await getUserTopTacks(id)

    return UserTopTracks
  } catch (error) {
    console.log(error)
  }
}
