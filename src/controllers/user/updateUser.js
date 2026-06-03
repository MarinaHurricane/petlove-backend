import { User } from '../../models/user.js';

export const updateUser = async (req, res) => {
  const userId = req.user.id;

  const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
    returnDocument: 'after',
  }).populate('favorites').populate('ownPets');

  res.status(200).json(updatedUser);
};
