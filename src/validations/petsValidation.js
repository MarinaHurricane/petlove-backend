import { Joi, Segments } from "celebrate";
import { CATEGORIES } from "../constants/categories.js";
import { SPECIES } from "../constants/species.js";
import { GENDER } from "../constants/gender.js";
import { isValidObjectId } from "mongoose";

export const getPublicPetsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(6),
    search: Joi.string().trim().allow(''),
    category: Joi.string().valid(...CATEGORIES),
    species: Joi.string().valid(...SPECIES),
    location: Joi.string().trim().allow(''),
    byDate: Joi.boolean().default(false),
    byPrice: Joi.boolean().default(false),
    gender: Joi.string().valid(...GENDER),
    sort: Joi.string(),
  })
};

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid MongoDB ObjectId');
};

export const createOwnPetSchema = {
  [Segments.BODY] : Joi.object({
    gender: Joi.string().valid(...GENDER),
    // avatar: Joi.string().trim().allow(''),
    title: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    dateOfBirth: Joi.date().required(),
    species: Joi.string().valid(...SPECIES),
    // owner: Joi.string().custom(objectIdValidator).required(),
  })
};

export const petIdSchema = {
  [Segments.PARAMS]: Joi.object({
    petId: Joi.string().custom(objectIdValidator).required(),
  })
};




