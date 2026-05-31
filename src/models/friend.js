import { Schema, model } from "mongoose";

  const workDaysSchema = new Schema({
    isOpen: {
      type: Boolean,
      required: true,
    },
    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  });

const friendSchema = new Schema({
   _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
    url: {
      type: String,
      required: true,
    },
    addressUrl : String,
    imageUrl: {
        type: String,
      required: true,

    },
    address: String,
    phone: String,
    email: String,

    workDays: [workDaysSchema],

});

export const Friend = model('Friend', friendSchema);
