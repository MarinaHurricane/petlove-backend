import { Pet } from '../../models/pet.js';

export const getRandomPet = async (req, res) => {
  const { species } = req.params;

  const [randomPet] = await Pet.aggregate([
    {
      $match: {
        species,
      },
    },
    {
      $sample: {
        size: 1,
      },
    },
  ]);

  if (!randomPet) {
    return res.status(404).json({ message: `no ${species} found` });
  }

  res.status(200).json(randomPet);
};
