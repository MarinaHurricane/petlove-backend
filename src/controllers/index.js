import { getPets } from "./pets/petsController.js";
import { getPetById } from "./pets/getPetById.js";
import { getNews } from "./news/newsController.js";
import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getPetsCategories } from "./pets/getPetsCategories.js";
import { getPetsGender } from "./pets/getPetsGender.js";
import { getPetsSpecies } from "./pets/getPetsSpecies.js";

export const pets = {
  getPets,
  getPetById,
  getPetsCategories,
  getPetsGender,
  getPetsSpecies,
};

export const news = {
  getNews,
};

export const auth = {
  registerUser,
  loginUser,
};
