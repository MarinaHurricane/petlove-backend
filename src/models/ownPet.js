import { Schema, model } from "mongoose";
import { GENDER } from "../constants/gender.js";
import { SPECIES } from "../constants/species.js";

const ownPetSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER,
  },
  imgUrl: String,
  title: String,
  name: String,
  dateOfBirth: Date,
  species: {
    type: String,
    enum: SPECIES,
  },
owner: {
  type: Schema.Types.ObjectId,
  ref: 'User',
}
},
{
  timestamps: true,
});

export const OwnPet = model('OwnPet', ownPetSchema);
