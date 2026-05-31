import { City } from '../../models/city.js';
import { Pet } from '../../models/pet.js';

export const getPetsCities = async (req, res) => {
  const locationIds = await Pet.distinct('location');

  const locations = await City.find({
    _id: { $in: locationIds },
  });

  res.status(200).json(locations);
};
