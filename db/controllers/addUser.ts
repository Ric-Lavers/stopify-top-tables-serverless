import { CurrentUsersProfileResponse } from "../../types/spotify-api"
import { saveUser } from "../models/user.model"

export const addUser = async (user: CurrentUsersProfileResponse) => {
  try {
    return await saveUser(user)
  } catch (error) {
    console.log(error)
  }
}
