import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
   _id: {
    type: Schema.Types.ObjectId,
  },
  imgUrl: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

export const News = model('News', newsSchema);
