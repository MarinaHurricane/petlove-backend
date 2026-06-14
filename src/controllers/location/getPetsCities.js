import { City } from '../../models/city.js';

export const getPetsCities = async (req, res) => {
  const { search= "" } = req.query;

  if(!search.trim()) {
    return res.status(200).json([]);
  }

  const locations = await City.find({
    city: {
      $regex: search.trim(),
      $options: "i",
    },
  }).limit(10);

  res.status(200).json(locations);
};
