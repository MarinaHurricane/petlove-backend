import { Schema, model } from 'mongoose';
import { SPECIES } from '../constants/species.js';
import { CATEGORIES } from '../constants/categories.js';
import { GENDER } from '../constants/gender.js';
import { City } from './city.js';

const petSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
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
    ref: City,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
