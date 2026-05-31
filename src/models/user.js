import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    },
  ],
  ownPets: [
    {
      type: Schema.Types.ObjectId,
      name: String,
      title: String,

    }
  ]
},
{
  timestamps: true,
},
);

export const User = model('User', userSchema);
