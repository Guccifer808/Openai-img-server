import mongoose from 'mongoose';

const connectDb = (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connection established'))
    .catch((error) => console.error(error));
};

export default connectDb;
