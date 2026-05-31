import { getPets } from "./pets/petsController.js";
import { getPetById } from "./pets/getPetById.js";
import { getNews } from "./news/newsController.js";
import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getPetsCategories } from "./pets/getPetsCategories.js";
import { getPetsGender } from "./pets/getPetsGender.js";
import { getPetsSpecies } from "./pets/getPetsSpecies.js";
import { logoutUser } from "./auth/logoutUser.js";
import { getFriends } from "./friends/getFriends.js";
import { getAllCities } from "./location/getAllCities.js";
import { getPetsCities } from "./location/getPetsCities.js";

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
  logoutUser,
};

export const friends = {
  getFriends,
};

export const location = {
  getAllCities,
  getPetsCities,
};
