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
import { addPetToFavorites } from "./user/addPetToFavorites.js";
import { removePetFromFavorites } from "./user/removePetFromFavorites.js";
import { getUserInfo } from "./user/getUserInfo.js";
import { addOwnPet } from "./pets/addOwnPet.js";
import { removeOwnPet } from "./pets/removeOwnPet.js";
import { updateUserAvatar } from "./user/updateUserAvatar.js";
import { updateUser } from "./user/updateUser.js";

export const pets = {
  getPets,
  getPetById,
  getPetsCategories,
  getPetsGender,
  getPetsSpecies,
    addOwnPet,
    removeOwnPet,
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

export const user = {
  getUserInfo,
  addPetToFavorites,
  removePetFromFavorites,
  updateUserAvatar,
  updateUser
};
