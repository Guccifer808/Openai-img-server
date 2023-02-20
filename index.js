import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import connectDb from './mongodb/connect.js';

import imageRoutes from './routes/imageRoutes.js';
import openaiRoutes from './routes/openaiRoutes.js';

dotenv.config();

//express init app
const app = express();
app.use(cors());
//setting up a file limit
app.use(express.json({ limit: '50mb' }));
// api endpoints
app.use('/api/v1/image', imageRoutes);
app.use('/api/v1/openai', openaiRoutes);

//routes
app.get('/', async (req, res) => {
  res.send('Hello from OpenAI');
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server is running on port 8080'));
  } catch (error) {
    console.log(error);
  }
};
startServer();
