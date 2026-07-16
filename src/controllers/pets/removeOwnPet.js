import { OwnPet } from '../../models/ownPet.js';
import { User } from '../../models/user.js';

export const removeOwnPet = async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;

  const pet = await OwnPet.findOneAndDelete({
    _id: petId,
    owner: userId,
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        ownPets: petId,
      },
    },
    { returnDocument: 'after' },
  ).populate('favorites').populate('ownPets').populate('viewed');

  res.status(200).json({pet, updatedUser});
};
