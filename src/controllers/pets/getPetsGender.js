import { GENDER } from "../../constants/gender.js";

export const getPetsGender = async(req, res) => {
  res.status(200).json(GENDER);
};
