import { City } from "../../models/city.js";

export const getAllCities = async( req, res) => {
  const cities = await City.find();
  res.status(200).json(cities);
};
