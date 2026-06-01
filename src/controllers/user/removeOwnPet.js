import { User } from "../../models/user.js";

export const removeOwnPet = async(req, res) => {
  const {petId} = req.params;
  const userId = req.user.id;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        ownPets: petId,
      }
    },
    {returnDocument: 'after'}
  ).populate('ownPets');

  res.status(200).json(updatedUser);
};
