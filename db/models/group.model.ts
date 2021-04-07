import omitBy from "lodash.omitby";
import { connectToDatabase } from "../connectToDB";
import { sortItemIds } from "../utils/sortItemIds";

export const createNewGroup = async (
  groupName: string,
  spotify_user_id: string
) => {
  const { Group, User } = connectToDatabase();
  //check if name exists
  // const checkGroupName = await Group.findOne({ name: groupName }).catch(
  //   () => null
  // );
  // if (checkGroupName) {
  //   throw new Error("group name already exists");
  // }

  const user = await User.findOne({ id: spotify_user_id }).populate("groups");
  const {
    track_short_term,
    track_medium_term,
    track_long_term,
    artist_short_term,
    artist_medium_term,
    artist_long_term,
  } = user;

  const lists = omitBy(
    {
      track_short_term,
      track_medium_term,
      track_long_term,
      artist_short_term,
      artist_medium_term,
      artist_long_term,
    },
    (x) => !x.length
  );
  Object.keys(lists).forEach((k) => {
    lists[k] = [lists[k]];
  });

  const newGroup = new Group({
    name: groupName,
    users: [user._id],
    // created_by: user._id,
    ...lists,
  });
  await newGroup.save();
  user.groups.push(newGroup._id);
  await user.save();
  user.groups.pop();
  return [...user.groups, newGroup];
};

export const addUserToGroup = async (
  groupName: string,
  spotify_user_id: string
) => {
  const { Group, User } = connectToDatabase();
  //check if name exists
  const group = await Group.findOne({ name: groupName }).catch(() => null);
  const user = await User.findOne({ id: spotify_user_id }).catch(() => null);

  if (!user) throw new Error("can not find user");
  if (!group) throw new Error("can not find group");

  if (!user.groups.includes(group._id)) user.groups.push(group._id);
  if (!group.users.includes(user._id)) group.users.push(user._id);

  group.track_short_term.push(user.track_short_term);
  group.track_medium_term.push(user.track_medium_term);
  group.track_long_term.push(user.track_long_term);
  group.artist_short_term.push(user.artist_short_term);
  group.artist_medium_term.push(user.artist_medium_term);
  group.artist_long_term.push(user.artist_long_term);

  await user.save();
  await group.save();

  return group;
};

export const getGroup = async (_id: string) => {
  const { Group, Artist, Track } = connectToDatabase();

  const group = await Group.findById(_id)
    .populate("users", "display_name")
    .catch(async () => {
      return await Group.findOne({ id: _id }).populate("users", "display_name");
    });

  async function populateTopItems(
    ids: string[][],
    type: "artist" | "track"
  ): Promise<any> {
    const sortedIds = sortItemIds(ids);
    const populatedItems = await Promise.all(
      //@ts-ignore
      sortedIds.map(({ id }) => {
        const Model = type === "artist" ? Artist : Track;
        return Model.findById(id);
      })
    );
    return populatedItems;
  }

  const [
    track_short_term,
    track_medium_term,
    track_long_term,
    artist_short_term,
    artist_medium_term,
    artist_long_term,
  ] = await Promise.all([
    populateTopItems(group.track_short_term, "track"),
    populateTopItems(group.track_medium_term, "track"),
    populateTopItems(group.track_long_term, "track"),
    populateTopItems(group.artist_short_term, "artist"),
    populateTopItems(group.artist_medium_term, "artist"),
    populateTopItems(group.artist_long_term, "artist"),
  ]);

  // populate tracks and artst
  return {
    id: group.id || group._id,
    users: group.users,
    track_short_term,
    track_medium_term,
    track_long_term,
    artist_short_term,
    artist_medium_term,
    artist_long_term,
  };
};
