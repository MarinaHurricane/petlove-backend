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
    sex
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
        { sex: { $regex: search, $options: 'i' } },
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

  if(sex) {
    petsQuery.where('sex').equals(sex);
  }

  const [totalPets, pets] = await Promise.all([
    petsQuery.clone().countDocuments(),
    petsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalPets / perPage);

  res.status(200).json({ page, perPage, totalPets, totalPages, pets });
};

export const getPetById = async (req, res) => {
  const { petId } = req.params;
  console.log(req.params);
  const pet = await Pet.findById(petId);
  if (!pet) {
    throw createHttpError(404, 'Pet not found');
  }
  res.status(200).json(pet);
};
