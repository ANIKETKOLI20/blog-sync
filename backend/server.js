import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Use the post routes
app.use('/posts', postRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build"))); //  dist replaced with build

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

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