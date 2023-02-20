import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Image from '../mongodb/models/image.js';

dotenv.config();

const router = express.Router();

export default router;
