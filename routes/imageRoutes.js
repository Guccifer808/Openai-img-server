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
router.route('/').get(async (req, res) => {
  try {
    const images = await Image.find({});
    request.status(200).json({ success: true, data: images });
  } catch (error) {
    request.status(500).json({ success: false, message: error });
  }
});

// create
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    //upload from client to cloudinary
    const photoURL = await cloudinary.uploader.upload(photo);

    //creating a new image in our db with cloudinary Url
    const newImage = await Image.create({
      name,
      prompt,
      photo: photoURL.url,
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
