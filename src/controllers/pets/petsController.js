import { City } from '../../models/city.js';
import { Pet } from '../../models/pet.js';
import createHttpError from 'http-errors';

export const getPets = async (req, res) => {
  const {
    page,
    perPage,
    search,
    category,
    species,
    location,
    byDate,
    gender,
    sort,
  } = req.query;
  const skip = (page - 1) * perPage;

  const petsQuery = Pet.find();

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
    const cities = await City.find({
      city: {
        $regex: location,
        $options: 'i',
      },
    });
    const cityIds = cities.map((city) => city._id.toString());
    petsQuery.where('location').in(cityIds);
  }

  if (byDate) {
    petsQuery.sort({ createdAt: 1 });
  }

  if (gender) {
    petsQuery.where('gender').equals(gender);
  }

  switch (sort) {
    case 'expensive':
      petsQuery.where('category').in(['sell', 'free']).sort({ price: -1 });
      break;
    case 'cheap':
      petsQuery.where('category').in(['sell', 'free']).sort({ price: 1 });
      break;
    case 'popular':
      petsQuery.sort({ popularity: -1 });
      break;
    case 'unpopular':
      petsQuery.sort({ popularity: 1 });
      break;
  }

  const [totalPets, pets] = await Promise.all([
    petsQuery.clone().countDocuments(),
    petsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalPets / perPage);

  res.status(200).json({ page, perPage, totalPets, totalPages, pets });
};
