import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Use the post routes
app.use('/posts', postRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('Failed to start the server:', error);
  });
