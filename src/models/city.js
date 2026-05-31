import { Schema, model } from 'mongoose';

const citySchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
});

export const City = model('City', citySchema);
