import { createNewGroup } from "../models/group.model"

export const createGroup = async (groupName, spotify_user_id) => {
  try {
    await createNewGroup(groupName, spotify_user_id)
  } catch (error) {}
}
