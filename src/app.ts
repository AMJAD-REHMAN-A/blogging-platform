import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';
import setupSwagger from '../swagger';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(postRoutes);
app.use(authRoutes);

app.use(errorHandler);

setupSwagger(app);
const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

export default app;
