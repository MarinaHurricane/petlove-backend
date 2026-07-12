import { User } from "../../models/user.js";

export const getUserInfo = async(req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate('favorites').populate('ownPets').populate('viewed');
  res.status(200).json(user);
};
