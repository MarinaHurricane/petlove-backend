import { OwnPet } from '../../models/ownPet.js';
import { User } from '../../models/user.js';

export const addOwnPet = async (req, res) => {
  const userId = req.user.id;

  const ownPet = await OwnPet.create({
    ...req.body,
    owner: userId,
  });

  console.log(ownPet);

  // const updatedUser = await User.findOneAndUpdate(
  //   { _id: userId },
  //   {
  //     $addToSet: {
  //       ownPets: ownPet,
  //     },
  //   },
  //   {returnDocument: 'after'}
  // ).populate('ownPets');

  res.status(201).json(ownPet);

};
