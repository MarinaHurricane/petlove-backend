import { Pet } from "../../models/pet.js";
import createHttpError from "http-errors";

export const getPetById = async (req, res) => {
  const { petId } = req.params;
  console.log(req.params);
  const pet = await Pet.findById(petId);
  if (!pet) {
    throw createHttpError(404, 'Pet not found');
  }
  res.status(200).json(pet);
};
