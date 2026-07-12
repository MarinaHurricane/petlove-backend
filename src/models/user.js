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
    phone: String,
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
      viewed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
