import { CATEGORIES } from "../../constants/categories.js";

export const getPetsCategories = async( req, res) => {
  res.status(200).json(CATEGORIES);
};
