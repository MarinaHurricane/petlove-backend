import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ Database connection success');
  } catch (error) {
    console.log('Error connecting to Database', error.massage);
    process.exit(1);
  }
};
