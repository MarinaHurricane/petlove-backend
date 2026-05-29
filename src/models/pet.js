import { Schema, model } from 'mongoose';
import { SPECIES } from '../constants/species.js';
import { CATEGORIES } from '../constants/categories.js';
import { GENDER } from '../constants/gender.js';

const petSchema = new Schema({
  _id: {
    type: String,
  },
  species: {
    type: String,
    enum: SPECIES,
    required: true,
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
},
);

export const Pet = model('Pet', petSchema);
