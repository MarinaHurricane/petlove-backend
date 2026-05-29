import { Pet } from '../../models/pet.js';
import createHttpError from 'http-errors';

export const getPets = async (req, res) => {
  const {
    page,
    perPage = 6,
    search,
    category,
    species,
    location,
    byDate,
    byPrice,
    gender,
  } = req.query;
  const skip = (page - 1) * perPage;

  const petsQuery = Pet.find();
  console.log(petsQuery);

  if (search) {
    petsQuery.where({
      $or: [
        { species: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { comment: { $regex: search, $options: 'i' } },
        { gender: { $regex: search, $options: 'i' } },
      ],
    });
  }

  if (category) {
    petsQuery.where('category').equals(category);
  }

  if (species) {
    petsQuery.where('species').equals(species);
  }

  if (location) {
    petsQuery.where('location').equals(location);
  }

  if (byPrice) {
    petsQuery.where('category').in(['sell', 'free']).sort({ price: 1 });
  }

  if (byDate) {
    petsQuery.sort({ createdAt: 1 });
  }

  if(gender) {
    petsQuery.where('gender').equals(gender);
  }

  const [totalPets, pets] = await Promise.all([
    petsQuery.clone().countDocuments(),
    petsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalPets / perPage);

  res.status(200).json({ page, perPage, totalPets, totalPages, pets });
};


