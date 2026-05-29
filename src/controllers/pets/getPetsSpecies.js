import { SPECIES } from '../../constants/species.js';

export const getPetsSpecies = async (req, res) => {
  res.status(200).json(SPECIES);
};
