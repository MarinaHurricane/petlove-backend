import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
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
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        default: [],
      },
    ],
    ownPets: [
      {
        type: Schema.Types.ObjectId,
       ref: 'OwnPet',
       default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const User = model('User', userSchema);
