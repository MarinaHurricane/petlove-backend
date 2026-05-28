import { getPets } from "./pets/petsController.js";
import { getPetById } from "./pets/petsController.js";
import { getNews } from "./news/newsController.js";
import { registerUser } from "./auth/registerUser.js";

export const pets = {
  getPets,
  getPetById,
};

export const news = {
  getNews,
};

export const auth = {
  registerUser,
};
