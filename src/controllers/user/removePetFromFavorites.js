import { User } from '../../models/user.js';

export const removePetFromFavorites = async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        favorites: petId,
      },
    },
    { returnDocument: 'after' },
  ).populate('favorites').populate('own');

  res.status(200).json(updatedUser);
};
