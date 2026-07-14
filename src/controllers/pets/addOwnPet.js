import { OwnPet } from '../../models/ownPet.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

export const addOwnPet = async (req, res) => {
  const userId = req.user.id;

  let avatarUrl = '';

  if (req.file) {
    avatarUrl = await saveFileToCloudinary(req.file.buffer, userId);
  }

  const ownPet = await OwnPet.create({
    ...req.body,
    avatar: avatarUrl.secure_url,
    owner: userId,
  });

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
