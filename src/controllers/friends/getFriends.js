import { Friend } from '../../models/friend.js';

export const getFriends = async (req, res) => {
  const friends = await Friend.find();
  res.status(200).json(friends);
};
