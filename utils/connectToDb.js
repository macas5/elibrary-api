import mongoose from 'mongoose';

const connectionToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connection to MongoDB is successful');
  } catch (error) {
    console.error(error);
  }
};

export default connectionToDb;
