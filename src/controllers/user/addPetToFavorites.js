import { User } from '../../models/user.js';

export const addPetToFavorites = async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $addToSet: {
        favorites: petId,
      },
    },
    { returnDocument: 'after' },
  ).populate('favorites').populate('ownPets').populate('viewed');

  res.status(200).json(updatedUser);
};
