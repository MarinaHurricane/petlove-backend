import { Schema, model } from 'mongoose';

const petSchema = new Schema({
  _id: {
    type: String,
  },
  species: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
  sex: {
    type: String,
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
