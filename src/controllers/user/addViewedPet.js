import { User } from "../../models/user.js";

export const addViewedPet = async(req, res) => {
  const userId = req.user._id;
  const {petId} = req.params;

  const updatedUser = await User.findOneAndUpdate(
    {_id: userId},
    {
      $addToSet: {
        viewed: petId
      }
    },
    {returnDocument: 'after'}
  ).populate('favorites').populate('ownPets').populate('viewed');

  return res.status(200).json(updatedUser);
};
