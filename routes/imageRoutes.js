import express, { request } from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Image from '../mongodb/models/image.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// get
router.route('/').get(async (request, response) => {
  try {
    const images = await Image.find({});
    response.status(200).json({ success: true, data: images });
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }
});

// create
router.route('/').post(async (request, response) => {
  try {
    const { name, prompt, photo } = request.body;

    //upload from client to cloudinary
    const photoURL = await cloudinary.uploader.upload(photo);

    //creating a new image in our db with cloudinary Url
    const newImage = await Image.create({
      name,
      prompt,
      photo: photoURL.url,
    });

    response.status(201).json({ success: true, data: newImage });
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }
});

export default router;
