import mongoose from 'mongoose';

const Image = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const ImageSchema = mongoose.model('Image', Image);

export default ImageSchema;
